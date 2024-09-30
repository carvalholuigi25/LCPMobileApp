#!/bin/bash

#pthproj="$HOME/Documents/projects/LCPMobileApp/server/api/LCPMobileAppApi"
pthproj=$(sudo find $HOME -type d -name "LCPMobileAppApi" 2>/dev/null)
pthmig="$pthproj/Migrations"
DefDBMode="SQLite"

cd "$pthproj" || exit

main() {
    clear
    echo
    echo "Generate DB for API"
    echo
    echo "--------------------------------------"
    echo "Author Info:"
    echo "Name: Luis Carvalho"
    echo "Email: luiscarvalho239@gmail.com"
    echo "Date creation of script: 30/09/2024"
    echo "--------------------------------------"
    echo
    echo "Choose your option:"
    echo
    echo "Note: The default option is $DefDBMode"
    echo
    echo "1 - SQLite"
    echo "2 - SQLServer"
    echo "3 - PostgresSQL"
    echo "4 - MySQL"
    echo "5 - All"
    echo
    read -p "" chdbmode

    case "$chdbmode" in
        ""|1) addsqlite ;;
        2) addsqlserver ;;
        3) addpostgressql ;;
        4) addmysql ;;
        5) addall ;;
        *) endchoice ;;
    esac
}

rmmigdir() {
    if [ -d "$pthmig/$DefDBMode" ]; then
        rm -rf "$pthmig/$DefDBMode"
    fi
}

addsqlite() {
    clear
    DefDBMode="SQLite"
    echo "$DefDBMode"
    rmmigdir
    dotnet ef migrations remove --force --context "MDBContext$DefDBMode"
    dotnet ef database drop --force --context "MDBContext$DefDBMode"
    dotnet ef migrations add "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode" --output-dir "$pthmig/$DefDBMode"
    dotnet ef database update "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode"
}

addsqlserver() {
    clear
    DefDBMode="SQLServer"
    echo "$DefDBMode"
    rmmigdir
    dotnet ef migrations remove --force --context "MDBContext$DefDBMode"
    dotnet ef database drop --force --context "MDBContext$DefDBMode"
    dotnet ef migrations add "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode" --output-dir "$pthmig/$DefDBMode"
    dotnet ef database update "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode"
}

addpostgressql() {
    clear
    DefDBMode="PostgresSQL"
    echo "$DefDBMode"
    rmmigdir
    dotnet ef migrations remove --force --context "MDBContext$DefDBMode"
    dotnet ef database drop --force --context "MDBContext$DefDBMode"
    dotnet ef migrations add "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode" --output-dir "$pthmig/$DefDBMode"
    dotnet ef database update "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode"
}

addmysql() {
    clear
    DefDBMode="MySQL"
    echo "$DefDBMode"
    rmmigdir
    dotnet ef migrations remove --force --context "MDBContext$DefDBMode"
    dotnet ef database drop --force --context "MDBContext$DefDBMode"
    dotnet ef migrations add "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode" --output-dir "$pthmig/$DefDBMode"
    dotnet ef database update "InitialCreate$DefDBMode" --context "MDBContext$DefDBMode"
}

addall() {
    addsqlite
    addsqlserver
    addpostgressql
    addmysql
}

endchoice() {
    clear
    echo "Invalid choice!"
    read -p "Press any key to continue..." -n1 -s
    exit 1
}

main
