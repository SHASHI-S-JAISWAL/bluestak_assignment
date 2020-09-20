export default function GetDate(dt){
    var d = new Date(dt);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      return ` ${months[d.getMonth()]} ${d.getFullYear()}, ${d.getDate()} `;
}