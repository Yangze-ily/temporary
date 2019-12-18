import instance from "./http"

// 添加公司
function Acompany(data) {
    return instance.post('Acompany',data)
}

// 获取公司列表
function GcompanyList() {
    return instance.get('Department/GcompanyList')
}

// 删除公司
function Dcompany(data) {
    return instance.post('Department/Dcompany',data)
}

// 修改公司
function Ucompany(data) {
    return instance.post('Department/Ucompany',data)
}


// 获取子公司信息
function GcompanyBuFId(data) {
    return instance.get('Department/GcompanyBuFId',data)
}


export {
    Acompany,
    GcompanyBuFId,
    GcompanyList,
    Dcompany,
    Ucompany,
}