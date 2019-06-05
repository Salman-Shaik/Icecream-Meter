const getMember = ({app},res) => res.json(app.memberData);

module.exports = { getMember }
