Class WOOP.Account Extends (%Persistent, %JSON.Adaptor)
{

Property Username As %String;

Property Password As %String;

Property Level As %Integer;

ClassMethod CreateNewAccountInTheDatabase(
	pUserName As %String,
	pPassword As %String,
	pLevel As %Integer = 0) As %Status
{

    Set user = ##class(WOOP.Account).%New()
    Set user.Username = pUserName
    Set user.Password = pPassword
    Set user.Level = pLevel
    Return user.%Save()
}

ClassMethod CreateNewAccount(
	pUserName As %String,
	pPassword As %String,
	pLevel As %Integer = 0) As WOOP.Account
{

    Set user = ##class(WOOP.Account).%New()
    Set user.Username = pUserName
    Set user.Password = pPassword
    Set user.Level = pLevel
    Return user
}

/// Get a account
/// <li>pUserName: the username to search for</li>
/// <li>user: the user by reference</li>
/// <li><b>returns</b>: the status</li>
/// <EXAMPLE> Do ##class(WOOP.Account).GetAccountByName("username", .user)</EXAMPLE>
ClassMethod GetAccountByName(
	pUserName As %String,
	ByRef user As WOOP.Account) As %Status
{
    #dim tSC as %Status = $$$OK
    Set id = ##class(WOOP.Account).GetIDByUserName(pUserName)
    If id = -1{
        Quit 0
    }
    Set user = ##class(WOOP.Account).%OpenId(id)
    Return tSC
}

ClassMethod GetIDByUserName(pUserName As %String) As %Integer
{
    #dim tSC as %Status = $$$OK
    Set sql = "SELECT ID as ID FROM WOOP.Account WHERE Username = '"_pUserName_"'"
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
<Data name="AccountDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>Username</Value>
</Value>
<Value name="3">
<Value>Password</Value>
</Value>
<Value name="4">
<Value>Level</Value>
</Value>
</Data>
<DataLocation>^WOOP.AccountD</DataLocation>
<DefaultData>AccountDefaultData</DefaultData>
<ExtentSize>0</ExtentSize>
<IdLocation>^WOOP.AccountD</IdLocation>
<IndexLocation>^WOOP.AccountI</IndexLocation>
<StreamLocation>^WOOP.AccountS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
