import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { limitText } from "../helpers";
/*
Function Error Handling
*/

const unauthorized = () => {
    Swal.fire({
        icon: 'warning',
        title: 'Token anda sudah habis',
        text: 'Sistem akan secara otomatis memindahkan anda untuk login kembali',
        showConfirmButton: false,
        timer: 3000
    })
}

const errorNetwork = () => {
    Swal.fire({
        icon: 'warning',
        title: 'Something Went Wrong',
        text: 'Unable to reach information, please check your network.',
        showConfirmButton: false,
        timer: 3000
    })
}


const requestTimeout = () => {
    Swal.fire({
        icon: 'warning',
        title: 'Jaringan terlalu lambat, periksa kembali jaringan anda.',
    })
}

const BadResponse = (message) => {
  
    if(limitText(message, 47) == "SQLSTATE[08006] [7] could not connect to server"){
        errorNetwork()
    } else{
        Swal.fire({
            icon: 'warning',
            title: 'Terjadi kesalahan!',
            text:  limitText(message, 500) 
        })
    }
  
}

const errorHandling = (error) => {
    if (error.code == "ERR_NETWORK") {
        errorNetwork()
    }
    else if (error.code == "ECONNABORTED") {
        requestTimeout()
    }
    else if (error.code == "ERR_BAD_RESPONSE"){
        BadResponse(error.response.data.message)
    }
    
    if (error.response.status == 401) {
        unauthorized()
        return window.location.href = '/signin'
    }

}

export {
    errorHandling
}