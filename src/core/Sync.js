/* global WebSocket, RTCPeerConnection, RTCIceCandidate */

/**
 * A static class which uses a clever mix of WebSocket and WebScoket transports to
 * provide P2P data syncing between devices. It's currently very rudimentary, and
 * requires better connection tracking and handling, along with a rolling HMAC
 * authenticator.
 *
 * Right now though, it uses a WebScoket signalling server to identify potentatil peers,
 * then hands over to RTC for candidate negotation, before establishing a P2P
 * DataChannel.
 *
 * It's designed to allow for any number of meshed connections (in theory). Plenty more
 * work to be done around security and making connection robust. Also need to look at
 * how this might work in the background with ServiceWorker.
 */
export class Sync {
  static init () {
    this.createSocket()
    this.initRTC(this.socket.id)
  }

  static createSocket () {
    this.socket = new WebSocket(this.socketUrl)
    this.socket.id = window.crypto.getRandomValues(new Uint32Array(1))[0]
    this.socket.onopen = (event) => this.onSocketOpen(event)
    this.socket.onmessage = (event) => this.onSocketMessage(event)
  }

  static onSocketOpen () {
    console.log('Socket opened', this.socket.id)

    const msg = {
      id: this.socket.id,
      type: 'spawn'
    }
    this.socket.send(JSON.stringify(msg))
  }

  static onSocketMessage (event) {
    const msg = JSON.parse(event.data)
    console.log('WS message received', msg)
    switch (msg.type) {
      case 'spawn':
        this.createOffer(msg)
        break
      case 'offer':
        this.handleOffer(msg)
        break
      case 'answer':
        this.handleAnswer(msg)
        break
      case 'candidate':
        this.handleCandidate(msg)
    }
  }

  static createRtcConnection () {
    const connection = new RTCPeerConnection({
      'iceServers': [
        { 'urls': 'stun:stun.l.google.com:19302' }
      ]
    })
    const channel = connection.createDataChannel('sync', { negotiated: true, id: 0 })

    channel.onopen = (event) => {
      console.log('Sending on channel')
      channel.send('Hi!')
    }
    channel.onmessage = (event) => {
      console.log(event.data)
    }
    return connection
  }

  static initRTC (id) {
    this.connections.set(id, this.createRtcConnection())
  }

  static createOffer (msg) {
    if (this.connections.size >= 2) return
    console.log('Creating an offer')
    this.initRTC(msg.id)
    const connection = this.connections.get(msg.id)
    connection.onicecandidate = event => this.sendCandidate(event.candidate)
    connection.createOffer({ iceRestart: true })
      .then(offer => connection.setLocalDescription(offer))
      .then(() => {
        const res = {
          offer: this.socket.id,
          type: 'offer',
          sdp: connection.localDescription
        }
        this.socket.send(JSON.stringify(res))
      })
  }

  static async handleOffer (msg) {
    console.log('Handling an offer', this.connections, msg)
    this.initRTC(msg.offer)
    const connection = this.connections.get(msg.offer)
    await connection.setRemoteDescription(msg.sdp)
    connection.createAnswer()
      .then(answer => connection.setLocalDescription(answer))
      .then(() => {
        const res = {
          offer: msg.offer,
          answer: this.socket.id,
          type: 'answer',
          sdp: connection.localDescription
        }
        this.socket.send(JSON.stringify(res))
      })
  }

  static async handleAnswer (msg) {
    console.log('Handling an answer', msg.offer, msg.answer, this.connections)
    await this.connections.get(msg.answer).setRemoteDescription(msg.sdp)
  }

  static sendCandidate (candidate) {
    if (!candidate) return
    console.log('Send candidate', candidate)
    const msg = {
      offer: this.socket.id,
      type: 'candidate',
      candidate: candidate
    }
    this.socket.send(JSON.stringify(msg))
  }

  static handleCandidate (msg) {
    console.log('Got candidate', this.connections, msg.candidate, msg.offer)
    this.connections.get(msg.offer).addIceCandidate(new RTCIceCandidate(msg.candidate))
  }
}

/* While class fields are still in spec, this provides a semantic compromise. */
Sync.socketUrl = 'ws://192.168.1.79:9999/'
Sync.socket = null
Sync.connections = new Map()
