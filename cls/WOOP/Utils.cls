Class WOOP.Utils
{

Parameter VERSION = "1.0.0";

ClassMethod VerifyAdmin(
	pUserName As %String,
	pPassword As %String) As %Status
{
    Set tSC = ##class(WOOP.Account).GetAccountByName(pUserName , .user)

    If tSC = 0{
        Return 0
    }
    If user.Password '= $SYSTEM.Encryption.Base64Encode(pPassword){
        Return 0
    }
    If user.Level '= 2{
        Return 0
    }
    Return 1
}

}
