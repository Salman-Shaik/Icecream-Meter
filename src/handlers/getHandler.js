const getMember = ({app},res) => res.json(app.meterData);

module.exports = { getMember }
