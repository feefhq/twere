/* global WebSocket, RTCPeerConnection */

export class Sync {
  static get url () {
    return 'ws://0.0.0.0:9999/'
  }

  static init () {
    this.socket = new WebSocket(this.url)
    this.socket.onopen = (event) => this.onopen(event)
    this.socket.onmessage = (event) => this.onmessage(event)
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
    this.connection = this.connection || new RTCPeerConnection()
  }

  static createOffer () {
    console.log('Creating an offer')
    this.initRTC()
    this.connection.createOffer()
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
    this.initRTC()
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
    this.initRTC()
    await this.connection.setRemoteDescription(sdp)
  }
}
