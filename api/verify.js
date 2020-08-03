const sendEvent = require('../lib/sendEvent')

const { VERIFICATION_TOKEN } = process.env

module.exports = (req, res) => {
  try {
    const { token } = req.body

    if (token === VERIFICATION_TOKEN) {
      const { event, type, challenge } = req.body

      // verify to slack that we are the real deal
      if (type === 'url_verification') {
        res.status(200).json({ challenge })
      }

      // handle event
      if (type === 'event_callback') {
        sendEvent(event)
        res.status(200).json({ success: true })
      }
    } else {
      res.status(401).json({ success: false, error: 'Unauthorized' })
    }
  } catch (err) {
    res.status(400).json({ success: false, error: 'Bad Request' })
  }
}
