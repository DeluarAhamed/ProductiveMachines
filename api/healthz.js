module.exports = function handler(req, res) {
  res.status(200).json({ok: true, service: 'productive-machines-website'})
}
