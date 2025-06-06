import React from 'react'
import AddUserModal from '@/components/Modals/AddUserModal'
import CreateTagModal from '@/components/Modals/CreateTagModal'

export default async function Page() {
  return (
    <div>
      <h1 className="text-center">Admin Panel</h1>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <AddUserModal />
        </div>
        <div className="col-sm-6 col-lg-3">
          <CreateTagModal />
        </div>
      </div>
    </div>
  )
}
