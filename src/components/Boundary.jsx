import { Component } from 'react'

// Keeps one failing section from blanking the whole page.
export default class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.error(err)
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children
  }
}
