#!/bin/bash
# Run once after cloning to enable the pre-commit hook.
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
echo "Git hooks configured. post and tag lists will be regenerated automatically on each commit."