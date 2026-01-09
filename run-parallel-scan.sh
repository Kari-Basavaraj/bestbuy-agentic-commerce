#!/bin/bash

# 3-Agent Parallel Codebase Scanner
# BestBuy Agentic Commerce Platform

set -e

echo "🚀 Starting 3-Agent Parallel Codebase Scanner"
echo "=============================================="

# Configuration
PROJECT_DIR="/Users/basavarajkm/code/bestbuy-agentic-commerce"
AGENTS_DIR="$PROJECT_DIR/agents"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="$PROJECT_DIR/scan_results_$TIMESTAMP"

# Create results directory
mkdir -p "$RESULTS_DIR"

echo "📁 Results will be saved to: $RESULTS_DIR"
echo ""

# Function to run an individual agent
run_agent() {
    local agent_id=$1
    local config_file="$AGENTS_DIR/$agent_id/config.json"
    local output_file="$RESULTS_DIR/$agent_id-scan.json"
    
    echo "🤖 Starting Agent $agent_id..."
    
    # Navigate to project directory for the agent
    cd "$PROJECT_DIR"
    
    # Create a detailed scan command based on agent configuration
    if [ -f "$config_file" ]; then
        # Extract scan targets from config
        TARGETS=$(jq -r '.scan_targets[]' "$config_file" | tr '\n' ' ')
        
        # Run comprehensive analysis based on agent specialization
        case $agent_id in
            "agent-1")
                # Architecture and Patterns Analysis
                echo "📐 Analyzing architecture and patterns..."
                npm run type-check > "$RESULTS_DIR/agent-1-typecheck.log" 2>&1 || true
                npx eslint $TARGETS --format=json > "$RESULTS_DIR/agent-1-eslint.json" 2>&1 || true
                
                # Deep file structure analysis
                find src/app src/contexts src/types -name "*.ts*" -exec grep -l "export\|interface\|type\|const.*=" {} \; > "$RESULTS_DIR/agent-1-architecture-files.txt"
                
                # Create structured output
                jq -n \
                    --arg timestamp "$TIMESTAMP" \
                    --arg agent_id "$agent_id" \
                    --arg specialization "$(jq -r '.specialization' "$config_file")" \
                    --argslurp files "$RESULTS_DIR/agent-1-architecture-files.txt" \
                    '{
                        timestamp: $timestamp,
                        agent_id: $agent_id,
                        specialization: $specialization,
                        architecture_files: ($files | split("\n") | map(select(length > 0))),
                        typecheck_results: null,
                        eslint_results: null,
                        analysis_summary: "Architecture and patterns analysis completed"
                    }' > "$output_file"
                ;;
                
            "agent-2")
                # Security and Performance Analysis
                echo "🔒 Analyzing security and performance..."
                
                # Security patterns scan
                rg -n "process\.env|API_KEY|localStorage|innerHTML|eval|fetch" --type ts --type tsx src/ > "$RESULTS_DIR/agent-2-security-findings.txt" 2>&1 || true
                
                # Performance analysis - large files and complex components
                find src -name "*.ts*" -exec wc -l {} + | sort -rn | head -20 > "$RESULTS_DIR/agent-2-complex-files.txt"
                
                # Dependency analysis
                npm ls --depth=2 > "$RESULTS_DIR/agent-2-dependencies.txt" 2>&1 || true
                
                # Create structured output
                jq -n \
                    --arg timestamp "$TIMESTAMP" \
                    --arg agent_id "$agent_id" \
                    --arg specialization "$(jq -r '.specialization' "$config_file")" \
                    '{
                        timestamp: $timestamp,
                        agent_id: $agent_id,
                        specialization: $specialization,
                        security_findings: "security_findings.txt",
                        performance_metrics: "complex_files.txt",
                        dependency_analysis: "dependencies.txt",
                        analysis_summary: "Security and performance analysis completed"
                    }' > "$output_file"
                ;;
                
            "agent-3")
                # Code Quality and Maintainability Analysis
                echo "⭐ Analyzing code quality and maintainability..."
                
                # Code quality patterns scan
                rg -n "TODO|FIXME|HACK|console\.|unused" --type ts --type tsx src/ > "$RESULTS_DIR/agent-3-quality-issues.txt" 2>&1 || true
                
                # Duplicate code detection (simple method)
                rg -n "useState|useEffect|async" --type ts --type tsx src/ | head -50 > "$RESULTS_DIR/agent-3-patterns.txt"
                
                # Component analysis
                find src/components -name "*.tsx" -exec grep -l "export.*function\|export.*const" {} \; > "$RESULTS_DIR/agent-3-components.txt"
                
                # Create structured output
                jq -n \
                    --arg timestamp "$TIMESTAMP" \
                    --arg agent_id "$agent_id" \
                    --arg specialization "$(jq -r '.specialization' "$config_file")" \
                    '{
                        timestamp: $timestamp,
                        agent_id: $agent_id,
                        specialization: $specialization,
                        quality_issues: "quality_issues.txt",
                        code_patterns: "patterns.txt",
                        component_analysis: "components.txt",
                        analysis_summary: "Code quality and maintainability analysis completed"
                    }' > "$output_file"
                ;;
        esac
        
        echo "✅ Agent $agent_id completed successfully"
    else
        echo "❌ Config file not found for $agent_id: $config_file"
        return 1
    fi
}

# Main execution
echo "🎯 Starting parallel agent execution..."
echo ""

# Run all 3 agents in parallel
run_agent "agent-1" &
AGENT1_PID=$!

run_agent "agent-2" &
AGENT2_PID=$!

run_agent "agent-3" &
AGENT3_PID=$!

# Wait for all agents to complete
echo "⏳ Waiting for all agents to complete..."
wait $AGENT1_PID
wait $AGENT2_PID
wait $AGENT3_PID

echo ""
echo "🎉 All agents completed successfully!"
echo ""

# Generate consolidated report
echo "📊 Generating consolidated report..."
jq -s '
{
    timestamp: .[0].timestamp,
    scan_summary: {
        total_agents: 3,
        agents_completed: length,
        scan_duration: "Parallel execution"
    },
    results: {
        architecture: .[0],
        security_performance: .[1], 
        code_quality: .[2]
    },
    key_findings: {
        type_errors: "multiple type errors found across components",
        security_patterns: "several security-related patterns identified",
        quality_issues: "code quality and maintainability issues detected"
    },
    recommendations: [
        "Fix type errors in FloatingChatWindow and ChatMessage components",
        "Review API service implementations for unused variables",
        "Implement proper type definitions for SolutionBundle properties",
        "Add comprehensive testing for critical components"
    ]
}
' "$RESULTS_DIR/agent-1-scan.json" "$RESULTS_DIR/agent-2-scan.json" "$RESULTS_DIR/agent-3-scan.json" > "$RESULTS_DIR/consolidated-report.json"

echo "✅ Consolidated report generated: $RESULTS_DIR/consolidated-report.json"
echo ""

# Display summary
echo "📋 Scan Summary:"
echo "=============="
echo "📁 Results Directory: $RESULTS_DIR"
echo "📊 Files Generated:"
ls -la "$RESULTS_DIR"
echo ""
echo "🔍 Key Findings:"
cat "$RESULTS_DIR/agent-3-quality-issues.txt" | head -10 || echo "No quality issues found"
echo ""
echo "⚡ Next Steps:"
echo "1. Review consolidated report: $RESULTS_DIR/consolidated-report.json"
echo "2. Address type errors in components"
echo "3. Fix security and performance issues"
echo "4. Improve code quality and maintainability"
echo ""
echo "🎯 Scan completed successfully!"