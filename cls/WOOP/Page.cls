Class WOOP.Page Extends (%Persistent, %JSON.Adaptor)
{

Relationship Chapter As WOOP.Chapter [ Cardinality = one, Inverse = Pages ];

Property Content As %String(MAXLEN = "");

Property Hint As %String(MAXLEN = "");

Property Result As %String(MAXLEN = "");

/// Creates a new page
/// <li>content: the content of the page</li>
/// <li>(optional)hint: the hint of the page</li>
/// <li>(optional)result: the reuslt of the page</li>
/// <li><b>returns</b>: the new page</li>
/// <EXAMPLE> Do ##class(WOOP.Page).CreateNewPage("content", "hint", "result")</EXAMPLE>
ClassMethod CreateNewPage(
	content As %String,
	hint As %String = "",
	result As %String = "") As %Status
{
    Set page = ##class(WOOP.Page).%New()
    Set page.Content = content
    Set page.Hint = hint
    Set page.Result = result
    Return page
}

Storage Default
{
<Data name="PageDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Content</Value>
</Value>
<Value name="3">
<Value>Hint</Value>
</Value>
<Value name="4">
<Value>Result</Value>
</Value>
<Value name="5">
<Value>Chapter</Value>
</Value>
</Data>
<DataLocation>^WOOP.PageD</DataLocation>
<DefaultData>PageDefaultData</DefaultData>
<ExtentSize>3</ExtentSize>
<IdLocation>^WOOP.PageD</IdLocation>
<IndexLocation>^WOOP.PageI</IndexLocation>
<Property name="%%CLASSNAME">
<AverageFieldSize>2</AverageFieldSize>
<Selectivity>100.0000%</Selectivity>
</Property>
<Property name="%%ID">
<AverageFieldSize>3</AverageFieldSize>
<Selectivity>1</Selectivity>
</Property>
<Property name="Content">
<AverageFieldSize>12</AverageFieldSize>
<Selectivity>33.3333%</Selectivity>
</Property>
<Property name="Hint">
<AverageFieldSize>9</AverageFieldSize>
<Selectivity>33.3333%</Selectivity>
</Property>
<Property name="Result">
<AverageFieldSize>11</AverageFieldSize>
<Selectivity>33.3333%</Selectivity>
</Property>
<SQLMap name="IDKEY">
<BlockCount>-4</BlockCount>
</SQLMap>
<StreamLocation>^WOOP.PageS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
