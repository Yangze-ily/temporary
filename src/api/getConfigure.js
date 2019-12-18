import instance from './http'

let configure = {
    getCustomervalue,
    getCustomersource,
    getCustomerindustry,
    getCustomerclass,
    getAccesstype,
    getQualificationtype,
    GCustomerCustomerAptitude,
    ACustomerCustomerAptitude,
    DCustomerCustomerAptitude,
    UCustomerCustomerAptitude
};



// 获取企业资质列表
function GCustomerCustomerAptitude(data) {
    return instance.get('Customer/GCustomerCustomerAptitude',{
        params:data
    })
}

// 添加企业资质列表
function ACustomerCustomerAptitude(data) {
    return instance.post('Customer/ACustomerCustomerAptitude',data)
}

// 删除企业资质列表
function DCustomerCustomerAptitude(data) {
    return instance.post('Customer/DCustomerCustomerAptitude',data)
}

// 修改企业资质列表
function UCustomerCustomerAptitude(data) {
    return instance.post('Customer/UCustomerCustomerAptitude',data)
}


// 获取客户价值
function getCustomervalue() {
    return instance.get('Customer/GCustomerConfig',{
        params:{typeValue:1003}
    })
}

// 获取客户来源
function getCustomersource() {
    return instance.get('Customer/GCustomerConfig',{
        params:{typeValue:1004}
    })
}

// 获取客户行业
function getCustomerindustry() {
    return instance.get('Customer/GCustomerConfig',{
        params:{typeValue:1006}
    })
}

// 获取客户分类
function getCustomerclass() {
    return instance.get('Customer/GCustomerConfig',{
        params:{typeValue:1007}
    })
}

// 获取客户访问类型
function getAccesstype() {
    return instance.get('Customer/GCustomerConfig',{
        params:{typeValue:1008}
    })
}

// 获取客户资质类型
function getQualificationtype() {
    return instance.get('Customer/GCustomerConfig',{
        params:{typeValue:1009}
    })
}



export {configure}