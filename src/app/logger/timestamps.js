var exports = module.exports = {};

exports.getDate = function( input )
{
    let date_ob = new Date(parseInt(input));
    // current date
    let day = ("0" + date_ob.getDate()).slice(-2)            // adjust 0 before single digit date
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)    // adjust 0 before single digit date
    let year = date_ob.getFullYear()
    let hours = date_ob.getHours()
    let minutes = date_ob.getMinutes()
    let seconds = date_ob.getSeconds()
    var date_str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' (UTC)';

    return date_str;    
}

