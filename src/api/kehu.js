import instance from './http'

let kehu = {
    getvipGrade,
    getkehu,
    updatamsg,
    uaddress,
    gaddress,
    aaddress,
    daddress,
    GCustomerAdversariaList,
    AustomerAdversaria,
    UustomerAdversaria,
    DCustomerAdversaria,
    querymsg,
    ACustomerVisit,
    UCustomerVisit,
    DCustomerVisit,
    GCustomerVisitList,
    ACustomer,
    AOrUpdateCustomerCommerce,
    GCustomerCommerce,
    ACustomerCustomerContacts,
    UCustomerCustomerContacts,
    DCustomerCustomerContacts,
    GCustomerCustomerContacts,
    customerToPond,
    retrieve,
    retrieveCol,
    ACustomerListShareToPeople,
    GStaffListByDepartId

}
// 查询当前员工的同部门同事
function GStaffListByDepartId(data) {
    return instance.get('Customer/GStaffListByDepartId', {
        params: data
    })
}


// 多个客户分享多个员工
function ACustomerListShareToPeople(data) {
    return instance.post('Customer/ACustomerListShareToPeople', data)
}


// 根据客户名或手机号进行检索
function retrieve(data) {
    return instance.get('Customer/GCustomerByNameOrPhone', {
        params: data
    })
}
// 根据同事名或手机号进行检索
function retrieveCol(data) {
    return instance.get('Customer/GPeopleListByName', {
        params: data
    })
}


// 客户资源接手操作
function customerToPond(data) {
    return instance.post('Customer/UCustomerToPond', data)
}


// 添加客户联系信息
function ACustomerCustomerContacts(data) {
    return instance.post('Customer/ACustomerCustomerContacts', data)

}
// 修改客户联系信息
function UCustomerCustomerContacts(data) {
    return instance.post('Customer/UCustomerCustomerContacts', data)

} // 删除客户联系信息
function DCustomerCustomerContacts(data) {
    return instance.post('Customer/DCustomerCustomerContacts', data)

}

// 获取客户联系信息
function GCustomerCustomerContacts(data) {
    return instance.get('Customer/GCustomerCustomerContacts', {
        params: data
    })
}


// 获取商户信息
function GCustomerCommerce(data) {
    return instance.get('Customer/GCustomerCommerce', {
        params: data
    })

}

//添加或修改商户信息
function AOrUpdateCustomerCommerce(data) {
    return instance.post('Customer/AOrUpdateCustomerCommerceByCustomer', data)

}

// 添加客户信息
function ACustomer(data) {
    return instance.post('Customer/ACustomer', data)

}

//添加客户回访记录
function ACustomerVisit(data) {
    return instance.post('Customer/ACustomerVisit', data)

}

//修改客户回访记录
function UCustomerVisit(data) {
    return instance.post('Customer/UCustomerVisit', data)

}

//删除改客户回访记录
function DCustomerVisit(data) {
    return instance.post('Customer/DCustomerVisit', data)
}

// 获取客户回访记录
function GCustomerVisitList(data) {
    return instance.get('Customer/GCustomerVisitList', {
        params: data
    })
}


// 获取客户记事列表
function GCustomerAdversariaList(data) {
    return instance.get('Customer/GCustomerAdversariaList', {
        params: data
    })
}

// 添加客户记事
function AustomerAdversaria(data) {
    return instance.post('Customer/AustomerAdversaria', data)

}

// 修改客户记事列表
function UustomerAdversaria(data) {
    return instance.post('Customer/UustomerAdversaria', data)
}

// 删除客户记事列表
function DCustomerAdversaria(data) {
    return instance.post('Customer/DCustomerAdversaria', data)
}


// 获取客户列表
function getkehu(data) {
    return instance.get('Customer/GMyCustomerList', {
        params: data

    })
}

// 获取会员等级
function getvipGrade() {
    return instance.get('Customer/GCustomerGrade')
}


// 查看用户个人信息
function querymsg(data) {
    return instance.get('Customer/GCustomerPersonalInfo', {
        params: data
    })

}

// 更新用户个人信息
function updatamsg(data) {
    return instance.post('Customer/UCustomerPersonalInfo', data)
}

// 更新用户收货地址
function uaddress(data) {
    return instance.post('Customer/UCustomerAddress', data)
}

// 获取用户收货地址
function gaddress(data) {
    return instance.get('Customer/GCustomerAddressList', {
        params: data
    })
}

// 添加用户收货地址
function aaddress(data) {
    return instance.post('Customer/ACustomerAddress', data)
}

// 删除用户收货地址
function daddress(data) {
    return instance.post('Customer/DCustomerAddress', data)
}


export {
    kehu
}