# Firebase Service Account Setup Helper
# This script helps you properly format your Firebase service account credentials

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Firebase Service Account Setup" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "⚠️  You need to download your service account key first!`n" -ForegroundColor Yellow

Write-Host "📋 Step 1: Download Service Account Key" -ForegroundColor Cyan
Write-Host "   1. Open: https://console.firebase.google.com/project/the-future-7eb56/settings/serviceaccounts/adminsdk"
Write-Host "   2. Click 'Generate new private key' button"
Write-Host "   3. Click 'Generate key' in the popup"
Write-Host "   4. Save the JSON file to a safe location`n"

Write-Host "📝 Step 2: Choose Your Setup Method`n" -ForegroundColor Cyan

Write-Host "   Option A: Base64 Encoding (Recommended - Easier)" -ForegroundColor Green
Write-Host "   - Encode the entire JSON file"
Write-Host "   - Single line in .env.local"
Write-Host "   - No formatting issues`n"

Write-Host "   Option B: Individual Fields (Manual)" -ForegroundColor Yellow
Write-Host "   - Extract 3 fields from JSON"
Write-Host "   - Must format private key correctly"
Write-Host "   - More error-prone`n"

$choice = Read-Host "Which option do you prefer? (A/B)"

if ($choice -eq "A" -or $choice -eq "a") {
    Write-Host "`n✅ You chose: Base64 Encoding`n" -ForegroundColor Green
    
    $jsonPath = Read-Host "Enter the full path to your downloaded JSON file"
    
    if (Test-Path $jsonPath) {
        try {
            $content = Get-Content -Path $jsonPath -Raw
            $base64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
            
            Write-Host "`n✅ Successfully encoded!`n" -ForegroundColor Green
            Write-Host "📋 Add this to your .env.local file:`n" -ForegroundColor Cyan
            Write-Host "FIREBASE_SERVICE_ACCOUNT=$base64`n" -ForegroundColor White
            
            Write-Host "💡 Instructions:" -ForegroundColor Yellow
            Write-Host "   1. Open .env.local file"
            Write-Host "   2. Find the line starting with # FIREBASE_SERVICE_ACCOUNT="
            Write-Host "   3. Uncomment it (remove the #)"
            Write-Host "   4. Replace 'base64_encoded_service_account_json_here' with the value above"
            Write-Host "   5. Comment out or remove the individual FIREBASE_* lines"
            Write-Host "   6. Save the file"
            Write-Host "   7. Run: npm run test:firebase`n"
            
            # Ask if they want to update .env.local automatically
            $autoUpdate = Read-Host "Would you like me to update .env.local automatically? (Y/N)"
            
            if ($autoUpdate -eq "Y" -or $autoUpdate -eq "y") {
                $envPath = Join-Path $PSScriptRoot ".." ".env.local"
                
                if (Test-Path $envPath) {
                    $envContent = Get-Content -Path $envPath -Raw
                    
                    # Comment out individual fields and add SERVICE_ACCOUNT
                    $envContent = $envContent -replace 'FIREBASE_PROJECT_ID=the-future-7eb56', '# FIREBASE_PROJECT_ID=the-future-7eb56'
                    $envContent = $envContent -replace 'FIREBASE_CLIENT_EMAIL=.*', '# FIREBASE_CLIENT_EMAIL=...'
                    $envContent = $envContent -replace 'FIREBASE_PRIVATE_KEY=.*', '# FIREBASE_PRIVATE_KEY=...'
                    $envContent = $envContent -replace '# FIREBASE_SERVICE_ACCOUNT=.*', "FIREBASE_SERVICE_ACCOUNT=$base64"
                    
                    Set-Content -Path $envPath -Value $envContent
                    
                    Write-Host "`n✅ .env.local has been updated!`n" -ForegroundColor Green
                    Write-Host "🧪 Now run: npm run test:firebase`n" -ForegroundColor Cyan
                }
                else {
                    Write-Host "`n❌ Could not find .env.local file" -ForegroundColor Red
                }
            }
            
        }
        catch {
            Write-Host "`n❌ Error encoding file: $_`n" -ForegroundColor Red
        }
    }
    else {
        Write-Host "`n❌ File not found: $jsonPath`n" -ForegroundColor Red
        Write-Host "💡 Make sure you entered the complete path, e.g.:" -ForegroundColor Yellow
        Write-Host "   C:\Users\YourName\Downloads\the-future-7eb56-firebase-adminsdk-xxxxx.json`n"
    }
    
}
elseif ($choice -eq "B" -or $choice -eq "b") {
    Write-Host "`n✅ You chose: Individual Fields`n" -ForegroundColor Green
    
    $jsonPath = Read-Host "Enter the full path to your downloaded JSON file"
    
    if (Test-Path $jsonPath) {
        try {
            $json = Get-Content -Path $jsonPath -Raw | ConvertFrom-Json
            
            $projectId = $json.project_id
            $clientEmail = $json.client_email
            $privateKey = $json.private_key -replace "`n", '\n'
            
            Write-Host "`n✅ Successfully extracted fields!`n" -ForegroundColor Green
            Write-Host "📋 Add these to your .env.local file:`n" -ForegroundColor Cyan
            Write-Host "FIREBASE_PROJECT_ID=$projectId" -ForegroundColor White
            Write-Host "FIREBASE_CLIENT_EMAIL=$clientEmail" -ForegroundColor White
            Write-Host "FIREBASE_PRIVATE_KEY=`"$privateKey`"`n" -ForegroundColor White
            
            Write-Host "⚠️  IMPORTANT: Make sure the private key:" -ForegroundColor Yellow
            Write-Host "   - Is wrapped in double quotes"
            Write-Host "   - Has \n (backslash-n) characters preserved"
            Write-Host "   - Is on a single line`n"
            
        }
        catch {
            Write-Host "`n❌ Error reading JSON file: $_`n" -ForegroundColor Red
        }
    }
    else {
        Write-Host "`n❌ File not found: $jsonPath`n" -ForegroundColor Red
    }
    
}
else {
    Write-Host "`n❌ Invalid choice. Please run the script again and choose A or B.`n" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
