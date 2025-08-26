#!/bin/bash

echo "🚀 Setting up GitHub repository for Medical Second Opinion Platform"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the second-opinion directory"
    exit 1
fi

echo "📋 Current status:"
git status --porcelain

echo ""
echo "🔗 To create a GitHub repository and view the visual diagrams:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named 'medical-second-opinion-platform'"
echo "3. Make it public (so you can view the diagrams)"
echo "4. Don't initialize with README (we already have one)"
echo ""
echo "5. Then run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/medical-second-opinion-platform.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "6. Visit your repository at:"
echo "   https://github.com/YOUR_USERNAME/medical-second-opinion-platform"
echo ""
echo "7. View the visual diagrams in:"
echo "   - README.md (project overview)"
echo "   - ARCHITECTURE.md (system architecture diagrams)"
echo "   - FLOWCHARTS.md (business process flowcharts)"
echo ""
echo "🎨 The Mermaid diagrams will automatically render as visual charts on GitHub!"
echo ""
echo "📊 Key diagrams you'll see:"
echo "   - High-level system architecture"
echo "   - Patient journey flowcharts"
echo "   - File upload processes"
echo "   - Case assignment workflows"
echo "   - Database schema relationships"
echo "   - Security and authentication flows"
echo "   - Decision trees and state machines"
echo ""
echo "✨ Once pushed to GitHub, all the Mermaid diagrams will be rendered as beautiful visual charts!"
