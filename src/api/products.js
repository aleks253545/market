import axios from 'axios';
import {config} from '../redux/config';

export let  downloadProducts = (offset) =>  axios.get(config.domain + `/products?offset=${offset}`)
