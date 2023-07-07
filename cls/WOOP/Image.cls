Class WOOP.Image Extends %Persistent
{

Property Name As %String;

Property Content As %Stream.GlobalBinary;

/// Create a new image
/// <li>pName: The name of the image</li>
/// <li>pContent: The content of the image</li>
/// <li><b>returns</b>: If the image could be saved</li>
/// <EXAMPLE> Do ##class(WOOP.Image).CreateNewImage()</EXAMPLE>
ClassMethod CreateNewImage(
	pName As %String,
	pContent As %String) As %Status
{
    Set image = ##class(WOOP.Image).%New()
    Set image.Name = pName
    Set image.Content = ##class(%Stream.GlobalBinary).%New()
    Do image.Content.WriteLine(pContent)
    Return image.%Save()
}

/// Get an Image by name
/// <li>pName: The name of the image</li>
/// <li>image: the image</li>
/// <li><b>returns</b>: True if the image exists</li>
/// <EXAMPLE> Do ##class(WOOP.Image).GetImageByName("test.jpg", .image)</EXAMPLE>
ClassMethod GetImageByName(
	pName As %String,
	ByRef image As WOOP.Image) As %Status
{
    #dim tSC as %Status = $$$OK
    Set id = ##class(WOOP.Image).GetIDByName(pName)
    If id = -1{
        Quit 0
    }
    Set image = ##class(WOOP.Image).%OpenId(id)
    Return tSC
}

ClassMethod GetIDByName(pName As %String) As %Integer [ Private ]
{
    #dim tSC as %Status = $$$OK
    Set sql = "SELECT ID as ID FROM WOOP.Image WHERE Name = '"_pName_"'"
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

Storage Default
{
<Data name="ImageDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Name</Value>
</Value>
<Value name="3">
<Value>PropertyName</Value>
</Value>
<Value name="4">
<Value>Content</Value>
</Value>
</Data>
<DataLocation>^WOOP.ImageD</DataLocation>
<DefaultData>ImageDefaultData</DefaultData>
<ExtentSize>1</ExtentSize>
<IdLocation>^WOOP.ImageD</IdLocation>
<IndexLocation>^WOOP.ImageI</IndexLocation>
<Property name="%%CLASSNAME">
<AverageFieldSize>2</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="%%ID">
<AverageFieldSize>3</AverageFieldSize>
<Selectivity>1</Selectivity>
</Property>
<Property name="Content">
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="Name">
<AverageFieldSize>26</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<SQLMap name="IDKEY">
<BlockCount>-4</BlockCount>
</SQLMap>
<StreamLocation>^WOOP.ImageS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
