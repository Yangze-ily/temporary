import instance from "./http"
let dept={
    deptlist,
    staff
}
// 获取部门列表
function deptlist() {
   return instance.get('Department/GDepartmentList')
}


// 获取员工
function staff(id) {
    return instance.post('SystemModul/GStaffInfo',id)
    
}

export {deptlist,staff,dept}