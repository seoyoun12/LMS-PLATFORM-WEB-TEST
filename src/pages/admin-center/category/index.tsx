import { AdminCenterLayout } from "@layouts/AdminCenter"
<<<<<<< HEAD
import { CategoryManagement } from "@layouts/AdminCenter";

export default function CategoryManagementPage() {
  return (
    <CategoryManagement/>
  )
}
=======
import { CategoryManagement } from "@layouts/AdminCenter/CategoryManagement/CategoryManagement";

export default function CategoryManagementPage() {

  return (

    <CategoryManagement/>

  )

}

>>>>>>> feat/calendar
CategoryManagementPage.Layout = AdminCenterLayout;