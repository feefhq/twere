/* global WebSocket, RTCPeerConnection, RTCIceCandidate */

export class Sync {
  static get url () {
    return 'ws://0.0.0.0:9999/'
  }

  static init () {
    this.socket = new WebSocket(this.url)
    this.socket.onopen = (event) => this.onopen(event)
    this.socket.onmessage = (event) => this.onmessage(event)
    this.initRTC()
  }

  static onopen (event) {
    console.log('WS opened', event)
    this.spawn()
  }

  static onmessage (event) {
    const msg = JSON.parse(event.data)
    console.log('WS message received', msg)
    switch (msg.type) {
      case 'spawn':
        this.createOffer()
        break
      case 'offer':
        this.handleOffer(msg.sdp)
        break
      case 'answer':
        this.handleAnswer(msg.sdp)
        break
      case 'candidate':
        this.handleCandidate(msg.candidate)
    }
  }

  static spawn () {
    const msg = {
      type: 'spawn',
      pid: '12345'
    }
    this.socket.send(JSON.stringify(msg))
  }

  static initRTC () {
    this.connection = new RTCPeerConnection({
      'iceServers': [
        { 'urls': 'stun:stun.l.google.com:19302' }
      ]
    })
    this.connection.onicecandidate = event => this.sendCandidate(event.candidate)
    this.channel = this.connection.createDataChannel('chat', { negotiated: true, id: 0 })

    this.channel.onopen = (event) => {
      console.log('Sending on channel')
      this.channel.send('Hi!')
    }
    this.channel.onmessage = (event) => {
      console.log(event.data)
    }

    console.log('Channel', this.channel)
  }

  static createOffer () {
    console.log('Creating an offer')
    this.connection.createOffer({ iceRestart: true })
      .then(offer => this.connection.setLocalDescription(offer))
      .then(() => {
        const msg = {
          type: 'offer',
          sdp: this.connection.localDescription
        }
        this.socket.send(JSON.stringify(msg))
      })
  }

  static async handleOffer (sdp) {
    console.log('Handling an offer')
    await this.connection.setRemoteDescription(sdp)
    this.connection.createAnswer()
      .then(answer => this.connection.setLocalDescription(answer))
      .then(() => {
        const msg = {
          type: 'answer',
          sdp: this.connection.localDescription
        }
        this.socket.send(JSON.stringify(msg))
      })
  }

  static async handleAnswer (sdp) {
    console.log('Handling an answer')
    await this.connection.setRemoteDescription(sdp)
  }

  static sendCandidate (candidate) {
    if (!candidate) return
    console.log('Send candidate', candidate)
    const msg = {
      type: 'candidate',
      candidate: candidate
    }
    this.socket.send(JSON.stringify(msg))
  }

  static handleCandidate (candidate) {
    console.log('Got candidate', candidate)
    this.connection.addIceCandidate(new RTCIceCandidate(candidate))
  }
}
