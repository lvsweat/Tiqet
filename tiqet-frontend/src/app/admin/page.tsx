import React from 'react'
import AddUserModal from '@/components/Modals/AddUserModal'
import CreateTagModal from '@/components/Modals/CreateTagModal'
import CreateRoleModal from '@/components/Modals/CreateRoleModal'

export default async function Page() {
  return (
    <>
      <h2 className="text-center">Admin Panel</h2>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <AddUserModal />
        </div>
        <div className="col-sm-6 col-lg-3">
          <CreateTagModal />
        </div>
        <div className="col-sm-6 col-lg-3">
          <CreateRoleModal />
        </div>
      </div>
    </>
  )
}
