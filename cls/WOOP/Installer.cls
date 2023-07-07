Class WOOP.Installer
{

/// Setup the webapplication for the InterSystems WOOP API.
/// <li><b>returns</b>: If the webapplication could be created</li>
/// <EXAMPLE> Write ##class(WOOP.Installer).SetUp()</EXAMPLE>
ClassMethod SetUp() As %Status
{
    #dim tSC as %Status = $$$OK

    Write #!,   "   ***************************************"
    Write !,    "   *** InterSystems WOOP API Installer ***"
    Write !,    "   ***************************************"
    Write !

    Set package = "WOOP"
    Set woopClasses=$LB("Account","Chapter","Image","impl","Page","spec","Utils")

    Set installClasses = ""

    Write !,"   * Looking for all necessary classes"
    For i = 1 : 1 : $LL(woopClasses) {
        Write !,"   * Looking for class """_package_"."_$LG(woopClasses, i)_""": "
        Set exist=##class(%Dictionary.CompiledClass).%ExistsId(package_"."_$LG(woopClasses, i))
        If exist{
            Write "found!"
        }Else{
            Write "not found!!!"
            If installClasses = ""{
                Set installClasses = installClasses_package_"."_$LG(woopClasses, i)
            }
            Else{
                Set installClasses = installClasses_", "_package_"."_$LG(woopClasses, i)
            }
        }
    }
    If installClasses = ""{
        Write !,"   * All classes found!"
        Write !
    }
    Else{
        Write !,"   * Please install this classes and then try again: "_installClasses
        Write !
        Quit 0
    }

	Set beforeNS = $NAMESPACE
    ZNspace "%SYS"

    Set props("Description") = "A REST API for the InterSystems Workshop Organizer and Optimizer Program."
    Set props("AutheEnabled")=96
    Set props("AutoCompile")=1
    Set props("CSPZENEnabled")=1
    Set props("CSRFToken")=0
    Set props("ChangePasswordPage")=""
    Set props("CookiePath")="/WOOP/"
    Set props("DeepSeeEnabled")=0
    Set props("DispatchClass")="WOOP.disp"
    Set props("Enabled")=1
    Set props("ErrorPage")=""
    Set props("EventClass")=""
    Set props("GroupById")=""
    Set props("HyperEvent")=0
    Set props("InbndWebServicesEnabled")=1
    Set props("IsNameSpaceDefault")=0
    Set props("LockCSPName")=1
    Set props("LoginPage")=""
    Set props("MatchRoles")=""
    Set props("Name")="/WOOP"
    Set props("NameSpace")=beforeNS
    Set props("Package")=""
    Set props("Path")=""
    Set props("PermittedClasses")=""
    Set props("Recurse")=1
    Set props("RedirectEmptyPath")=0
    Set props("Resource")=""
    Set props("ServeFiles")=1
    Set props("ServeFilesTimeout")=3600
    Set props("SessionScope")=2
    Set props("SuperClass")=""
    Set props("Timeout")=900
    Set props("TwoFactorEnabled")=0
    Set props("Type")=2
    Set props("UseCookies")=2
    Set props("UserCookieScope")=2
    Set props("iKnowEnabled")=0

    Set tSC = ##class(Security.Applications).Create("/WOOP", .props)
    If tSC = 1{
        Write !,"   * Webapp WOOP created!"
    }
    Else{
        Write !,"   * Webapp WOOP could not be created!"
        Write !,"   * Installation failed!!!"
        Write !
        ZNspace beforeNS
        Quit 0
    }
    ZNspace beforeNS
    Write !
    Write !,"   * Create a User"
    Read !, "   * Enter a username: ",username
    Read !, "   * Enter a password: ",password

    Set systemAcc = ##class(WOOP.Account).CreateNewAccount("_system", $SYSTEM.Encryption.Base64Encode("woop"), 2)
    Set tSC = systemAcc.%Save()
    Set tSC = 1
    If tSC = 1 {
        Write !,"   * User "_username_" created!"
    }
    Else{
        Write !,"   * Could not create user "_username_"!"
    }

    Write !
    Read !,"   * Create welcome chapter? (y/N) ", createWelcomeChapter
    If createWelcomeChapter = "y" {
        Write !,"   * Yes"
        If ..GetWelcomeChapter(username).%Save(){
            Write !,"   * Welcome chapter saved!"
        }
        Else{
            Write !,"   * Welcome chapter could not be saved!"
        }
    } 
    ElseIf createWelcomeChapter = "Y"{
        Write !,"   * Yes"
        If ..GetWelcomeChapter(username).%Save(){
            Write !,"   * Welcome chapter saved!"
        }
        Else{
            Write !,"   * Welcome chapter could not be saved!"
        }
    }
    Else{
        Write !,"   * No"
    }

    Write !
    Write !, "  * Successfully installed the InterSystems WOOP API!"
    Write !, "  * You can now connect your front end app with this InterSystems IRIS instance!"
    Write !, "  * Have a nice day :)"
    Write !
    Return tSC
}

ClassMethod GetWelcomeChapter(username As %String) As WOOP.Chapter
{
    Set json = "{""Title"":""Welcome chapter"",""Language"":""english"",""Author"":"""",""IsPrivate"":false,""Pages"":[{""Content"":""![logo](assets/imgs/InterSystemsWOOPLogo.png){width: 20%}\n\n# Welcome to InterSystems Workshop Organizer and Optimizer Program\n\nThe InterSystems Workshop Organizer and Optimizer Program is a program designed to help you organize and optimize your InterSystems workshop experience. The program is designed to help you get the most out of your workshop experience by providing you with a set of tools and resources to help you organize your workshop experience."",""Hint"":"""",""Result"":""""},{""Content"":""## Create your first workshop\n\nTo create your first workshop, you will need to be logged in. On the homepage you can see a list of all the workshops you have created and a + button to create a new workshop.\n\nThe program will displays you a form to fill in the details of your workshop:\n\n-   **Name**: The name of your workshop.\n-   **Language**: The language of your workshop.\n-   **Password**: The password of your workshop.\n-   **Private**: If enabled the workshop is private and only accessible by you.\n-   **Description**: A short description of your workshop."",""Hint"":"""",""Result"":""""},{""Content"":""## Edit your workshop\n\nTo edit your workshop, you will need to be logged in. On the homepage you can see a list of all the workshops you have created and a edit button to edit your workshop.Clicking on the edit button you will be navigated to the edit page of your workshop."",""Hint"":"""",""Result"":""""},{""Content"":""## Add your first page\n\nWhen you edit a workshop you can add and remove pages. Lets add a page and have a look at a page...\n\nHow you can see, the page is divided in three parts:\n\n-   **Conent**: Here you can write the content of your page. Usually you will create your exercises here.\n-   **Hint**: Here you can write a hint for the exercise.\n-   **Result**: Here you can write the solution of the exercise."",""Hint"":""## Hint\n\nThis is a Hint."",""Result"":""## Result\n\nThis is a result.""},{""Content"":""## Writing pages\n\nPages are written in Markdown. You can find a Markdown cheatsheet by clicking on the _help_ button.\n\nLets take a look at all the features of the Markdown language..."",""Hint"":"""",""Result"":""""},{""Content"":""### Haedings\n\nYou can create headings by adding a `#` in front of your text. The number of `#` defines the level of the heading."",""Hint"":"""",""Result"":""~~~markdown\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n~~~""},{""Content"":""### Text\n\nYou can write text as you would do in any other text editor."",""Hint"":"""",""Result"":""~~~markdown\nThis is a text.\n~~~""},{""Content"":""### Styling your text\n\n- Text can be **bold** by adding `**` in front and after your text.\n- Text can be *italic* by adding `*` in front and after your text.\n- Text can be ~~strikethrough~~ by adding `~~` in front and after your text."",""Hint"":"""",""Result"":""~~~markdown\n**bold**\n*italic*\n~~strikethrough~~\n~~~""},{""Content"":""### Unordered Lists\n\nYou can create lists by adding a `-` in front of your text."",""Hint"":"""",""Result"":""~~~markdown\n- Item 1\n- Item 2\n- Item 3\n~~~""},{""Content"":""### Ordered Lists\n\nYou can create ordered lists by adding a number and a `.` in front of your text."",""Hint"":"""",""Result"":""~~~markdown\n1. Item 1\n2. Item 2\n3. Item 3\n~~~""},{""Content"":""### Links\n\nYou can create links by adding `[` and `]` in front and after your text. The first part is the text of the link and the second part is the link itself."",""Hint"":"""",""Result"":""~~~markdown\n[Link text](https://www.intersystems.com)\n~~~""},{""Content"":""### Images\n\nYou can add images by adding `![` and `]` in front and after your text. The first part is the alt text of the image and the second part is the link to the image."",""Hint"":"""",""Result"":""~~~markdown\n![Alt text](url){css}\n~~~""},{""Content"":""### Code Block\n\nYou can add code by adding ` ``` ` in front and after your text. The first part is the language of the code and the second part is the code itself."",""Hint"":"""",""Result"":""~~~markdown\n```javascript\nconsole.log(\""Hello World!\"");\n```\n~~~""},{""Content"":""### Code Window\n\nYou can add code by adding ` ~~~ ` in front and after your text. The first part is the language of the code and the second part is the code itself."",""Hint"":"""",""Result"":""~~~markdown\n ~~~javascript\n console.log(\""Hello World!\"");\n ~~~\n~~~""},{""Content"":""## Have fun!\n\nNow you can create your own workshops and have fun!"",""Hint"":"""",""Result"":""""}],""Password"":"""",""Description"":""This is a test chapter to welcome you to the InterSystems Workshop Organizer and Optimizer Program!""}"
    Set chapter = ##class(WOOP.Chapter).%New()
    Do chapter.%JSONImport(json)
    Set chapter.Author = username
    Return chapter
}

}
