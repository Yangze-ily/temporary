import instance from './http'

function getdata(data) {
  return  instance.get('Customer/GCustomerContrast',data)
}

export {getdata}