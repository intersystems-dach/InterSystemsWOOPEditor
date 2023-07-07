Class WOOP.Chapter Extends (%Persistent, %JSON.Adaptor)
{

/// The title of the chapter
Property Title As %String;

/// The password of the chapter
Property Password As %String;

/// The language of the chapter
Property Language As %String;

/// The author of the chapter
Property Author As %String;

/// The description of the chapter
Property Description As %String(MAXLEN = "");

/// If the chapter is private
Property IsPrivate As %Boolean [ InitialExpression = 0 ];

/// Description
Relationship Pages As WOOP.Page [ Cardinality = many, Inverse = Chapter ];

/// Adds a page to the pages
/// <li>pPage: the page to add</li>
/// <li><b>returns</b>: if the page could be added</li>
/// <EXAMPLE> Do instance.AddPage(##class(WOOP.Page).%New())</EXAMPLE>
Method AddPage(pPage As WOOP.Page) As %Status
{
    Return ..Pages.Insert(pPage)
}

/// Adds a new page to the pages
/// <li>pContent: the content of the new page</li>
/// <li>(optional)pHint: the hint of the new page</li>
/// <li>(optional)pResult: the result of the new page</li>
/// <li><b>returns</b>: if the page could be added</li>
/// <EXAMPLE> Do instance.AddNewPage("content", "hint", "result")</EXAMPLE>
Method AddNewPage(
	pContent As %String,
	pHint As %String = "",
	pResult As %String = "") As %Status
{
    Return ..Pages.Insert(##class(WOOP.Page).CreateNewPage(pContent, pHint, pResult))
}

/// Deletes this chapter from the database
/// <li><b>returns</b>: If the chapter could be deleted</li>
/// <EXAMPLE> Do instance.Delete()</EXAMPLE>
Method Delete() As %Status
{
    Tstart

    Set key = ""

    Do {
        Set page = ..Pages.GetNext(.key)
        If (page '= "") {
            Set tSC = ##class(WOOP.Page).%DeleteId(page.%Id())
            If $$$ISERR(tSC){
                Return 0
            }
        }
    } While (key '= "")

    Set tSC = ##class(WOOP.Chapter).%DeleteId(..%Id())
    If $$$ISERR(tSC){
        Return 0
    }

    Tcommit
    Return $$$OK
}

/// Get a chapter from the database by title
/// <li>pTitle: the title</li>
/// <li>chapter: the chapter</li>
/// <li><b>returns</b>: The status</li>
/// <EXAMPLE> Do ##class(WOOP.Chapter).GetChapterByTitle("title", .chapter)</EXAMPLE>
ClassMethod GetChapterByTitle(
	pTitle As %String,
	ByRef chapter As WOOP.Chapter) As %Status
{
    #dim tSC as %Status = $$$OK
    Set id = ##class(WOOP.Chapter).GetIDByTitle(pTitle)
    If id = -1{
        Quit 0
    }
    Set chapter = ##class(WOOP.Chapter).%OpenId(id)
    Return tSC
}

/// Gets the ID of a chapter by its title
/// <li>pTitle: The title</li>
/// <li><b>returns</b>: The ID or -1 when the chapter is not found</li>
/// <EXAMPLE> Set id = ##class(WOOP.Chapter).GetIDByTitle("title")</EXAMPLE>
ClassMethod GetIDByTitle(pTitle As %String) As %Integer [ Private ]
{
    #dim tSC as %Status = $$$OK
    Set sql = "SELECT ID as ID FROM WOOP.Chapter WHERE Title = '"_pTitle_"'"
    Set stmt = ##class(%SQL.Statement).%New()
    Set tSC = stmt.%Prepare(sql)
    If $$$ISERR(tSC){
        Return -1
    }
    Set rs = stmt.%Execute()
    While rs.%Next(){
        Return rs.%Get("ID")
    }
    Return -1
}

/// Get all chapters from the database
/// <li>pArray: The array with the chapters</li>
/// <li><b>returns</b>: The status</li>
/// <EXAMPLE> set status = ##class(WOOP.Chapter).GetAllChapters(.chapters)</EXAMPLE>
ClassMethod GetAllChapters(ByRef pArray As %DynamicArray) As %Status
{
    #dim array as %DynamicArray = ##class(%DynamicArray).%New()

    Set sql = "SELECT Title, ID as ID FROM WOOP.Chapter"
    Set stmt = ##class(%SQL.Statement).%New()
    Set tSC = stmt.%Prepare(sql)
    If $$$ISERR(tSC){
        Return 0
    }
    Set rs = stmt.%Execute()
    While rs.%Next(){
        Set chapter = ##class(WOOP.Chapter).%OpenId(rs.%Get("ID"))
        If chapter.Password '= ""{
            Set chapter.Password = "x"
        }
        Do chapter.%JSONExportToString(.json)
        Do array.%Push(##class(%DynamicObject).%FromJSON(json))
    }
    Set pArray = array
    Return $$$OK
}

/// Checks if the Title is already in use
/// <li>pTitle: The title</li>
/// <li><b>returns</b>: 1 if the title is free and 0 if the title is already in use</li>
/// <EXAMPLE> if ##class(WOOP.Chapter).CheckIfTitleIsFree("title") { ... }</EXAMPLE>
ClassMethod CheckIfTitleIsFree(pTitle As %String) As %Boolean
{
    Set sql = "SELECT Title FROM WOOP.Chapter"
    Set stmt = ##class(%SQL.Statement).%New()
    Set tSC = stmt.%Prepare(sql)
    Set rs = stmt.%Execute()
    While rs.%Next(){
        If pTitle = rs.%Get("Title"){
            Return 0
        }
    }
    Return 1
}

Storage Default
{
<Data name="ChapterDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Title</Value>
</Value>
<Value name="3">
<Value>Pages</Value>
</Value>
<Value name="4">
<Value>Password</Value>
</Value>
<Value name="5">
<Value>Language</Value>
</Value>
<Value name="6">
<Value>Author</Value>
</Value>
<Value name="7">
<Value>Description</Value>
</Value>
<Value name="8">
<Value>IsPrivate</Value>
</Value>
</Data>
<DataLocation>^WOOP.ChapterD</DataLocation>
<DefaultData>ChapterDefaultData</DefaultData>
<ExtentSize>1</ExtentSize>
<IdLocation>^WOOP.ChapterD</IdLocation>
<IndexLocation>^WOOP.ChapterI</IndexLocation>
<Property name="%%CLASSNAME">
<AverageFieldSize>2</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="%%ID">
<AverageFieldSize>3</AverageFieldSize>
<Selectivity>1</Selectivity>
</Property>
<Property name="Author">
<AverageFieldSize>4</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="Description">
<AverageFieldSize>24</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="IsPrivate">
<AverageFieldSize>2</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="Language">
<AverageFieldSize>4</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="Pages">
<AverageFieldSize>17</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="Password">
<AverageFieldSize>5</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="Title">
<AverageFieldSize>13</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<SQLMap name="IDKEY">
<BlockCount>-4</BlockCount>
</SQLMap>
<StreamLocation>^WOOP.ChapterS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
