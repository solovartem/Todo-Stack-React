module.exports = ({
    Success: {
        erro: false,
        msg: 'Success!'
    },
    Error: {
        erro: true,
        msg: err => err
    },
    Custom: (val, message) => ({ erro: val, msg: message })
})
