# OrganizeProgram

signUp->type 1.parent and 2.organization
login

firstname ,lastname,email, phonenumber,type,password
 
organization->programs  (CRUD)
fields-> name,img,time-AM-PM,
location

parent can register programs(organization)
parent can view its registered programs
parent akshay, rahul
organization -> abc,xyz


abc->2 programs >football,cricket
xyz->1 program->chess
As a parent Akshay can subscribe programs which he wants .
same for rahul,

when akshay sees his subscribed programs he will get the list of prgrams which he subscribed and also he will also get the list of all programs which he can choose to subscribe


list page filter<opted|both|not-opted>
-------------------
org|programs name|opted
abc|football|false [view]
---------------------
view page
 name , img,time-AM-PM,
location
opted true|false
-----------------------


______________________________________________________


create the signup  page for the  organization and parent 
fields are firstname ,lastname,email, phonenumber,type( organization or parent ),password

create the login page for the organization and parent 



//_______________APIs_______________________________________

//auth
router.post('api/auth/register', registerController)
router.post('api/auth/login',    loginController)

//organizations
router.post('/api/organizations/create-program' , createProgramController  )
router.get('/api/organizations/get-program' , getAllProgramController  )
router.patch('/api/organizations/update-program/:id' , updateProgramController  )
router.delete('/api/organizations/delete-program/:id' , deleteProgramController  )

//parents
router.post('/api/parents/register-program' , registerInProgramController  )
router.get('/api/parents/subscribe-program' , subscribedProgramsController)
router.get('/api/parents/unsubscribe-program' , unsubscribedProgramsController)
router.get('/api/parents/all-program' , allprogramsController)






