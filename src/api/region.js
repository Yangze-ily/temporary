import instance from "./http"
let region={
    GRegionalInfo,
    GRegionalInfoByParentId
}
// 获取省
function GRegionalInfo() {
    return instance.get('Customer/GRegionalInfo');
}

// 获取区域信息通过父级id
function GRegionalInfoByParentId(data) {
    return instance.get('Customer/GRegionalInfoByParentId',{
        params: data
    })
}

export {region}