/// A REST API for the InterSystems Workshop Organizer and Optimizer Program.<br/>
/// Business logic class defined by OpenAPI in WOOP.spec<br/>
/// Updated Jul 7, 2023 16:23:31
Class WOOP.impl Extends %REST.Impl [ ProcedureBlock ]
{

/// If ExposeServerExceptions is true, then details of internal errors will be exposed.
Parameter ExposeServerExceptions = 1;

/// This request returns a reply message in response to a /ping request.
ClassMethod ping() As %Stream.Object
{
    Do ..%SetStatusCode(200)
    Quit {"status": true}.%ToJSON()
}

/// This request returns a reply message with the version
ClassMethod getVersion() As %Stream.Object
{
    Do ..%SetStatusCode(200)
    Set obj = ##class(%DynamicObject).%New()
    Do obj.%Set("version",##class(WOOP.Utils).#VERSION)
    Quit obj
}

/// Checks if a user and the password is in the database<br/>
/// The method arguments hold values for:<br/>
///     username, The username<br/>
///     password, The password<br/>
ClassMethod userCheck(
	username As %String,
	password As %String) As %Stream.Object
{
    #dim tSC as %Status = $$$OK

    Set tSC = ##class(WOOP.Account).GetAccountByName(username, .user)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "Username or password incorrect"
    }
    If $SYSTEM.Encryption.Base64Encode(password) '= user.Password{
        Do ..%SetStatusCode(404)
        Quit "Username or password incorrect"
    }

    Do ..%SetStatusCode(200)
    Set obj = ##class(%DynamicObject).%New()
    Do obj.%Set("level",user.Level)
    Do obj.%Set("username",user.Username)
    Quit obj
}

/// Add a User in the database
ClassMethod addUser() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)

    If ##class(WOOP.Utils).VerifyAdmin(body.%Get("userName"), body.%Get("password")) = 0{
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set newUser = ##class(WOOP.Account).CreateNewAccount(body.%Get("newUserName"), $SYSTEM.Encryption.Base64Encode(body.%Get("newPassword")), 1)
    Set tSC = newUser.%Save()
    Set response = ##class(%DynamicObject).%New()
    Do response.%Set("status",tSC)
    Do ..%SetStatusCode(200)
    Quit response.%ToJSON()
}

/// Deletes a User in the database
ClassMethod deleteUser() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)

    If ##class(WOOP.Utils).VerifyAdmin(body.%Get("userName"), body.%Get("password")) = 0{
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set tSC = ##class(WOOP.Account).GetAccountByName(body.%Get("userNameToDelete") , .user)
    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "User not found"
    }

    If user.Level = 2{
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set tSC = ##class(WOOP.Account).%DeleteId(user.%Id())
    Set response = ##class(%DynamicObject).%New()
    Do response.%Set("status",tSC)
    Do ..%SetStatusCode(200)
    Quit response.%ToJSON()
}

/// Make a user to an admin
ClassMethod makeUserToAdmin() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)

    If ##class(WOOP.Utils).VerifyAdmin(body.%Get("userName"), body.%Get("password")) = 0{
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set tSC = ##class(WOOP.Account).GetAccountByName(body.%Get("userNameToMakeAdmin") , .user)
    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "User not found"
    }

    Set user.Level = 2
    Set tSC = user.%Save()

    Set response = ##class(%DynamicObject).%New()
    Do response.%Set("status",tSC)
    Do ..%SetStatusCode(200)
    Quit response.%ToJSON()
}

/// Change a password of a user
ClassMethod changePassword() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)

    Set tSC = ##class(WOOP.Account).GetAccountByName(body.%Get("userName") , .user)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "User not found"
    }
    If user.Password '= $SYSTEM.Encryption.Base64Encode(body.%Get("password")){
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set user.Password = $SYSTEM.Encryption.Base64Encode(body.%Get("newPassword"))

    Set tSC = user.%Save()
    Set response = ##class(%DynamicObject).%New()
    Do response.%Set("status",tSC)
    Do ..%SetStatusCode(200)
    Quit response.%ToJSON()
}

/// Get all chapters from the database
ClassMethod getAllChapters() As %Stream.Object
{
    Do ..%SetStatusCode(200)
    Do ##class(WOOP.Chapter).GetAllChapters(.array)
    Quit array
}

/// Verify a chapter with a password<br/>
/// The method arguments hold values for:<br/>
///     title, The title of the chapter<br/>
///     password, The password<br/>
ClassMethod verifyChapter(
	title As %String,
	password As %String) As %Stream.Object
{
    #dim tSC as %Status = $$$OK

    Set tSC = ##class(WOOP.Chapter).GetChapterByTitle(title, .chapter)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "Chapter not found"
    }

    Do ..%SetStatusCode(200)
    If password '= chapter.Password{
        Quit {"status": false}.%ToJSON()
    }
    Quit {"status": true}.%ToJSON()
}

/// Adds a new chapter to the database
ClassMethod createNewChapter() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)

    If '##class(WOOP.Chapter).CheckIfTitleIsFree(body.%Get("Title")){
        Do ..%SetStatusCode(409)
        Quit "Chapter title is already used"
    }

    Set chapter =  ##class(WOOP.Chapter).%New()
    
    Set tSC = chapter.%JSONImport(body)
    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Chapter could not be saved"
    }

    Set tSC = chapter.%Save()
    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Chapter could not be saved"
    }

    Do ..%SetStatusCode(200)
    Quit {"status": true}.%ToJSON()
}

/// Imports a chapter in the database<br/>
/// The method arguments hold values for:<br/>
///     username, The username<br/>
///     password, The password<br/>
ClassMethod importChapter(
	username As %String,
	password As %String) As %Stream.Object
{
    Set tSC = ##class(WOOP.Account).GetAccountByName(username , .user)

    If tSC = 0{
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }
    If user.Password '= $SYSTEM.Encryption.Base64Encode(password){
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)
    Set tSC = ##class(WOOP.Chapter).GetChapterByTitle(body.%Get("Title"), .chapter)
    If tSC = 0{
        //new chapter
        Set chapter =  ##class(WOOP.Chapter).%New()
        
        Set tSC = chapter.%JSONImport(body)
        If $$$ISERR(tSC){
            Do ..%SetStatusCode(500)
            Quit "Chapter could not be saved"
        }

        Set tSC = chapter.%Save()
        If $$$ISERR(tSC){
            Do ..%SetStatusCode(500)
            Quit "Chapter could not be saved"
        }

        Do ..%SetStatusCode(200)
        Quit {"status": true}.%ToJSON()
    }
    Else{
        // update chapter
        If user.Level = 1 {
            If chapter.Author '= username{
                Do ..%SetStatusCode(401)
                Quit "Unauthorized"
            }
        }

        Set newChapter =  ##class(WOOP.Chapter).%New()
    
        Set tSC = newChapter.%JSONImport(body)
        If $$$ISERR(tSC){
            Do ..%SetStatusCode(500)
            Quit "Chapter could not be updated"
        }

        If newChapter.Password = "x"{
            Set newChapter.Password = chapter.Password
        }

        Tstart

        Set tSC = newChapter.%Save()
        If $$$ISERR(tSC){
            Do ..%SetStatusCode(500)
            Quit "Chapter could not be updated"
        }

        Set tSC = chapter.Delete()

        If $$$ISERR(tSC){
            Do ..%SetStatusCode(500)
            Quit "Chapter could not be updated"
        }

        Tcommit

        Do ..%SetStatusCode(200)
        Quit {"status": true}.%ToJSON()
    }
}

/// Updates a chapter in the database
ClassMethod updateChapter() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)
    Set tSC = ##class(WOOP.Chapter).GetChapterByTitle(body.%Get("Title"), .oldChapter)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "Chapter not found"
    }


    Set newChapter =  ##class(WOOP.Chapter).%New()
    
    Set tSC = newChapter.%JSONImport(body)
    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Chapter could not be updated"
    }

    If newChapter.Password = "x"{
        Set newChapter.Password = oldChapter.Password
    }

    Tstart

    Set tSC = newChapter.%Save()
    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Chapter could not be updated"
    }

    Set tSC = oldChapter.Delete()

    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Chapter could not be updated"
    }
    
    Tcommit

    Do ..%SetStatusCode(200)
    Quit {"status": true}.%ToJSON()
}

/// Deletes a chapter in the database
ClassMethod deleteChapter() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)
    Set tSC = ##class(WOOP.Chapter).GetChapterByTitle(body.%Get("Title"), .chapter)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "Chapter not found"
    }


    Set tSC = chapter.Delete()

    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Chapter could not be deleted"
    }
    
    Do ..%SetStatusCode(200)
    Quit {"status": true}.%ToJSON()
}

/// Uploads an Image to the database
ClassMethod uploadImage() As %Stream.Object
{
    Set body = ##class(%DynamicObject).%FromJSON(%request.Content)
    Set tSC = ##class(WOOP.Image).CreateNewImage(body.%Get("Name"), body.%Get("Content"))
    Set response = ##class(%DynamicObject).%New()
    Do response.%Set("status",tSC)
    Do ..%SetStatusCode(200)
    Quit response.%ToJSON()
}

/// Get an image from the database<br/>
/// The method arguments hold values for:<br/>
///     imageName, Name of the image<br/>
ClassMethod getImage(imageName As %String) As %Stream.Object
{
    Set tSC = ##class(WOOP.Image).GetImageByName(imageName, .image)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "Image not found"
    }
    Do ..%SetStatusCode(200)
    Return image.Content
}

/// Get all image names in the database
ClassMethod getAllImageNames() As %Stream.Object
{
    Set sql = "SELECT Name FROM WOOP.Image"
    Set stmt = ##class(%SQL.Statement).%New()
    Set tSC = stmt.%Prepare(sql)
    If $$$ISERR(tSC){
        Do ..%SetStatusCode(500)
        Quit "Could not get image names"
    }
    Set rs = stmt.%Execute()

    Set nameArray = ##class(%DynamicArray).%New()

    While rs.%Next(){
        Do nameArray.%Push(rs.%Get("Name"))
    }
    Do ..%SetStatusCode(200)
    Return nameArray.%ToJSON()
}

/// Get the password for a chapter<br/>
/// The method arguments hold values for:<br/>
///     title, The title of the chapter<br/>
///     username, The username of the user<br/>
///     password, The password of the user<br/>
ClassMethod getPasswordForChapter(
	title As %String,
	username As %String,
	password As %String) As %Stream.Object
{
    Set tSC = ##class(WOOP.Account).GetAccountByName(username , .user)

    If tSC = 0{
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }
    If user.Password '= $SYSTEM.Encryption.Base64Encode(password){
        Do ..%SetStatusCode(401)
        Quit "Unauthorized"
    }

    Set tSC = ##class(WOOP.Chapter).GetChapterByTitle(title, .chapter)

    If tSC = 0{
        Do ..%SetStatusCode(404)
        Quit "Chapter not found"
    }

    If user.Level < 2 {
        If user.Username '= chapter.Author{
            Do ..%SetStatusCode(401)
            Quit "Unauthorized"
        }
    }

    Set response = ##class(%DynamicObject).%New()
    Do response.%Set("password",chapter.Password)
    Do ..%SetStatusCode(200)
    Quit response.%ToJSON()
}

}
