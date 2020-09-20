import {data} from '../resource/data';

export default  function Filter(value){

    //initial storing in local storage
    if(!localStorage.getItem('data')){
        let temp =JSON.stringify(data);
        localStorage.setItem('data',temp);
    }

    //filtering of localstorage data on basis of date categories
    var data1 = JSON.parse(localStorage.getItem('data'))
    if (value === 'past'){
        return data1.filter( ele => { return  date_diff_indays(ele.createdOn)  < 0 })
    }
    else if (value === 'live'){
        return data1.filter( ele => { return  date_diff_indays(ele.createdOn)  === 0 })
    }
    else {
        return data1.filter( ele => { return date_diff_indays(ele.createdOn)  > 0 })
    }

    function date_diff_indays ( date2) {
        let dt1 = new Date();
        let dt2 = new Date(date2);
        let diff =  Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        return diff ;
    }
}