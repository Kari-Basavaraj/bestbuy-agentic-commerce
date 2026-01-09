#!/bin/bash

# Quality Assurance and Validation Script
# Validates the comprehensive scan results

set -e

echo "🔍 Quality Assurance and Validation"
echo "=================================="

# Find the latest results directory
LATEST_RESULTS=$(ls -1t /Users/basavarajkm/code/bestbuy-agentic-commerce/scan_results_* 2>/dev/null | head -1)

if [ -z "$LATEST_RESULTS" ]; then
    echo "❌ No scan results found. Please run the parallel scan first."
    exit 1
fi

echo "📁 Analyzing results from: $LATEST_RESULTS"
echo ""

# Function to validate agent results
validate_agent_results() {
    local agent_id=$1
    local results_file="$LATEST_RESULTS/$agent_id-scan.json"
    
    echo "🤖 Validating $agent_id results..."
    
    if [ ! -f "$results_file" ]; then
        echo "❌ Missing results file: $results_file"
        return 1
    fi
    
    # Check JSON validity
    if ! jq empty "$results_file" 2>/dev/null; then
        echo "❌ Invalid JSON in $results_file"
        return 1
    fi
    
    # Check required fields
    local required_fields=("timestamp" "agent_id" "specialization" "analysis_summary")
    for field in "${required_fields[@]}"; do
        if ! jq -e ".has(\"$field\")" "$results_file" > /dev/null; then
            echo "❌ Missing required field '$field' in $results_file"
            return 1
        fi
    done
    
    echo "✅ $agent_id validation passed"
    return 0
}

# Function to assess coverage
assess_coverage() {
    echo "📊 Assessing codebase coverage..."
    
    local total_files=$(find /Users/basavarajkm/code/bestbuy-agentic-commerce/src -name "*.ts*" -type f | wc -l)
    local scanned_files=0
    
    # Count files mentioned in all scan results
    if [ -f "$LATEST_RESULTS/agent-1-architecture-files.txt" ]; then
        scanned_files=$((scanned_files + $(cat "$LATEST_RESULTS/agent-1-architecture-files.txt" | wc -l)))
    fi
    
    if [ -f "$LATEST_RESULTS/agent-3-components.txt" ]; then
        scanned_files=$((scanned_files + $(cat "$LATEST_RESULTS/agent-3-components.txt" | wc -l)))
    fi
    
    local coverage_percentage=0
    if [ $total_files -gt 0 ]; then
        coverage_percentage=$(( (scanned_files * 100) / total_files ))
    fi
    
    echo "📈 Coverage Analysis:"
    echo "   Total TypeScript files: $total_files"
    echo "   Files analyzed: $scanned_files"
    echo "   Coverage percentage: $coverage_percentage%"
    
    if [ $coverage_percentage -lt 70 ]; then
        echo "⚠️  Low coverage detected. Consider expanding scan targets."
    elif [ $coverage_percentage -ge 90 ]; then
        echo "🎯 Excellent coverage achieved!"
    else
        echo "✅ Good coverage achieved."
    fi
}

# Function to validate findings
validate_findings() {
    echo "🔍 Validating scan findings..."
    
    local critical_issues=0
    local warnings=0
    local info=0
    
    # Check for type errors
    if grep -q "ERROR" "$LATEST_RESULTS/agent-1-typecheck.log" 2>/dev/null; then
        critical_issues=$(grep -c "ERROR" "$LATEST_RESULTS/agent-1-typecheck.log" 2>/dev/null || echo 0)
    fi
    
    # Check for security patterns
    if [ -f "$LATEST_RESULTS/agent-2-security-findings.txt" ]; then
        warnings=$(cat "$LATEST_RESULTS/agent-2-security-findings.txt" | wc -l)
    fi
    
    # Check for quality issues
    if [ -f "$LATEST_RESULTS/agent-3-quality-issues.txt" ]; then
        info=$(cat "$LATEST_RESULTS/agent-3-quality-issues.txt" | wc -l)
    fi
    
    echo "📋 Issue Summary:"
    echo "   🔴 Critical Issues: $critical_issues"
    echo "   🟡 Warnings: $warnings"
    echo "   🔵 Info: $info"
    
    # Determine overall health
    if [ $critical_issues -gt 10 ]; then
        echo "❌ CRITICAL: High number of type errors detected!"
        return 2
    elif [ $critical_issues -gt 0 ]; then
        echo "⚠️  WARNING: Type errors need attention."
        return 1
    elif [ $warnings -gt 20 ]; then
        echo "⚠️  WARNING: Many security patterns found."
        return 1
    else
        echo "✅ GOOD: Code quality is acceptable."
        return 0
    fi
}

# Function to generate remediation plan
generate_remediation_plan() {
    echo "📋 Generating remediation plan..."
    
    local remediation_file="$LATEST_RESULTS/remediation-plan.md"
    
    cat > "$remediation_file" << 'EOF'
# Codebase Remediation Plan

## Priority 1: Critical Type Errors
### Files requiring immediate attention:
EOF

    # Extract type error files
    if [ -f "$LATEST_RESULTS/agent-1-typecheck.log" ]; then
        grep "ERROR" "$LATEST_RESULTS/agent-1-typecheck.log" | head -10 | while read line; do
            local file=$(echo "$line" | grep -o '[^[:space:]]*\.tsx\?' | head -1)
            if [ -n "$file" ]; then
                echo "- **$file**: $(echo "$line" | cut -d':' -f4-)" >> "$remediation_file"
            fi
        done
    fi
    
    cat >> "$remediation_file" << 'EOF'

### Actions:
1. Fix type definition mismatches in SolutionBundle interface
2. Resolve AgentMessage type inconsistencies
3. Add proper type guards for optional properties
4. Update Product interface to include brand field

## Priority 2: Security Hardening
### Areas to review:
EOF

    if [ -f "$LATEST_RESULTS/agent-2-security-findings.txt" ]; then
        grep -E "(process\.env|localStorage|innerHTML)" "$LATEST_RESULTS/agent-2-security-findings.txt" | head -5 | while read line; do
            echo "- $(echo "$line" | cut -d':' -f1):$(echo "$line" | cut -d':' -f2)" >> "$remediation_file"
        done
    fi

    cat >> "$remediation_file" << 'EOF'

### Actions:
1. Implement proper environment variable validation
2. Add input sanitization for user content
3. Review API key handling and storage
4. Add rate limiting to API endpoints

## Priority 3: Code Quality Improvements
### Technical debt items:
EOF

    if [ -f "$LATEST_RESULTS/agent-3-quality-issues.txt" ]; then
        grep -E "(TODO|FIXME|console\.)" "$LATEST_RESULTS/agent-3-quality-issues.txt" | head -5 | while read line; do
            echo "- $(echo "$line" | cut -d':' -f1):$(echo "$line" | cut -d':' -f2)" >> "$remediation_file"
        done
    fi

    cat >> "$remediation_file" << 'EOF'

### Actions:
1. Remove console.log statements for production
2. Address TODO and FIXME comments
3. Extract large components into smaller functions
4. Add proper error handling and logging

## Timeline Estimate
- Priority 1 (Critical): 2-3 days
- Priority 2 (Security): 1-2 days  
- Priority 3 (Quality): 1-2 days
- Total estimated effort: 4-7 days

## Success Criteria
- Zero TypeScript compilation errors
- All security warnings addressed
- Code quality score > 90%
- Test coverage > 80%
EOF

    echo "✅ Remediation plan generated: $remediation_file"
}

# Main execution
echo "🚀 Starting quality assurance validation..."
echo ""

# Validate all agent results
echo "Phase 1: Agent Results Validation"
echo "================================="
validate_agent_results "agent-1"
AGENT1_STATUS=$?
validate_agent_results "agent-2" 
AGENT2_STATUS=$?
validate_agent_results "agent-3"
AGENT3_STATUS=$?

# Exit if any agent validation failed
if [ $AGENT1_STATUS -ne 0 ] || [ $AGENT2_STATUS -ne 0 ] || [ $AGENT3_STATUS -ne 0 ]; then
    echo "❌ Agent validation failed. Exiting."
    exit 1
fi

echo ""

# Assess coverage
echo "Phase 2: Coverage Assessment"
echo "=============================="
assess_coverage
COVERAGE_STATUS=$?
echo ""

# Validate findings
echo "Phase 3: Findings Validation"
echo "============================="
validate_findings
FINDINGS_STATUS=$?
echo ""

# Generate remediation plan
echo "Phase 4: Remediation Planning"
echo "=============================="
generate_remediation_plan
echo ""

# Final assessment
echo "🎯 Final Quality Assessment"
echo "============================"
if [ $FINDINGS_STATUS -eq 2 ]; then
    echo "❌ CRITICAL: Immediate attention required!"
    echo "   Multiple critical issues detected."
    exit 2
elif [ $FINDINGS_STATUS -eq 1 ]; then
    echo "⚠️  WARNING: Issues need attention."
    echo "   Address warnings and type errors."
    exit 1
else
    echo "✅ EXCELLENT: Code quality is good!"
    echo "   Minor improvements recommended."
    exit 0
fi

echo ""
echo "📊 Validation completed successfully!"
echo "📁 Detailed results available in: $LATEST_RESULTS"
echo "📋 Remediation plan: $LATEST_RESULTS/remediation-plan.md"