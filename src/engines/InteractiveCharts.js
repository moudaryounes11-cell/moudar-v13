var InteractiveCharts = {
  generateBudgetPieData: function (budget, lang) {
    var l = lang || 'fr';
    if (!budget || !budget.breakdown) return null;
    var categories = {
      personnel: {
        label: l === 'fr' ? 'Personnel' : 'Personnel',
        color: '#3b82f6'
      },
      equipment: {
        label: l === 'fr' ? 'Équipement' : 'Equipment',
        color: '#10b981'
      },
      training: {
        label: l === 'fr' ? 'Formation' : 'Training',
        color: '#f59e0b'
      },
      materials: {
        label: l === 'fr' ? 'Matériel' : 'Materials',
        color: '#8b5cf6'
      },
      overhead: {
        label: l === 'fr' ? 'Frais généraux' : 'Overhead',
        color: '#6b7280'
      },
      contingency: {
        label: l === 'fr' ? 'Contingence' : 'Contingency',
        color: '#ef4444'
      }
    };
    var data = [];
    var total = 0;
    Object.keys(budget.breakdown).forEach(function (key) {
      total += budget.breakdown[key] || 0;
    });
    Object.keys(budget.breakdown).forEach(function (key) {
      var value = budget.breakdown[key] || 0;
      if (value > 0 && categories[key]) {
        data.push({
          category: key,
          label: categories[key].label,
          value: value,
          percentage: Math.round(value / total * 100),
          color: categories[key].color
        });
      }
    });
    data.sort(function (a, b) {
      return b.value - a.value;
    });
    return {
      data: data,
      total: total,
      currency: budget.currency || 'EUR'
    };
  },
  generateGanttData: function (timeline, lang) {
    var l = lang || 'fr';
    if (!timeline || !timeline.phases) return null;
    var phaseColors = {
      exploration: '#3b82f6',
      preparation: '#f59e0b',
      implementation: '#10b981',
      sustainment: '#8b5cf6'
    };
    var phaseLabels = {
      exploration: {
        fr: 'Exploration',
        en: 'Exploration'
      },
      preparation: {
        fr: 'Préparation',
        en: 'Preparation'
      },
      implementation: {
        fr: 'Implémentation',
        en: 'Implementation'
      },
      sustainment: {
        fr: 'Pérennisation',
        en: 'Sustainment'
      }
    };
    var ganttData = [];
    var startMonth = 0;
    timeline.phases.forEach(function (phase, index) {
      var phaseId = phase.id || phase.name || 'phase_' + index;
      var duration = phase.duration || 6;
      ganttData.push({
        id: phaseId,
        label: phaseLabels[phaseId] && phaseLabels[phaseId][l] || phase.name || phaseId,
        start: startMonth,
        duration: duration,
        end: startMonth + duration,
        color: phaseColors[phaseId] || '#6b7280',
        milestones: phase.milestones || [],
        activities: phase.activities || []
      });
      startMonth += duration;
    });
    return {
      phases: ganttData,
      totalDuration: startMonth,
      unit: l === 'fr' ? 'mois' : 'months'
    };
  },
  generateProgressData: function (project, lang) {
    var l = lang || 'fr';
    var data = {
      overall: 0,
      sections: []
    };
    var sections = [{
      id: 'basics',
      label: l === 'fr' ? 'Informations de base' : 'Basic info',
      fields: ['title', 'domain', 'context', 'country'],
      weight: 15
    }, {
      id: 'population',
      label: l === 'fr' ? 'Population & Objectifs' : 'Population & Goals',
      fields: ['population', 'targets', 'objectives'],
      weight: 15
    }, {
      id: 'barriers',
      label: l === 'fr' ? 'Barrières' : 'Barriers',
      fields: ['barriers'],
      weight: 20
    }, {
      id: 'strategies',
      label: l === 'fr' ? 'Stratégies' : 'Strategies',
      check: function (p) {
        return p.protocol && p.protocol.strategies && p.protocol.strategies.length > 0;
      },
      weight: 25
    }, {
      id: 'evaluation',
      label: l === 'fr' ? 'Évaluation' : 'Evaluation',
      check: function (p) {
        return p.protocol && (p.protocol.reaim || p.protocol.kpis);
      },
      weight: 15
    }, {
      id: 'diagnostic',
      label: l === 'fr' ? 'Diagnostic CFIR' : 'CFIR Diagnostic',
      check: function (p) {
        return !!p.diagnostic;
      },
      weight: 10
    }];
    var totalWeight = 0,
      completedWeight = 0;
    sections.forEach(function (section) {
      var completed = 0,
        total = 0;
      if (section.fields) {
        total = section.fields.length;
        section.fields.forEach(function (field) {
          if (project[field] && (typeof project[field] === 'string' ? project[field].trim() !== '' : true)) completed++;
        });
      } else if (section.check) {
        total = 1;
        completed = section.check(project) ? 1 : 0;
      }
      var progress = total > 0 ? Math.round(completed / total * 100) : 0;
      data.sections.push({
        id: section.id,
        label: section.label,
        progress: progress,
        weight: section.weight
      });
      totalWeight += section.weight;
      completedWeight += progress / 100 * section.weight;
    });
    data.overall = Math.round(completedWeight / totalWeight * 100);
    return data;
  },
  generateDonutSVG: function (data, options) {
    options = options || {};
    var size = options.size || 200;
    var strokeWidth = options.strokeWidth || 30;
    var centerX = size / 2,
      centerY = size / 2;
    var radius = (size - strokeWidth) / 2;
    var circumference = 2 * Math.PI * radius;
    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">';
    svg += '<circle cx="' + centerX + '" cy="' + centerY + '" r="' + radius + '" fill="none" stroke="#e5e7eb" stroke-width="' + strokeWidth + '"/>';
    var currentOffset = 0;
    data.forEach(function (item) {
      var segmentLength = item.percentage / 100 * circumference;
      svg += '<circle cx="' + centerX + '" cy="' + centerY + '" r="' + radius + '" fill="none" stroke="' + item.color + '" stroke-width="' + strokeWidth + '" stroke-dasharray="' + segmentLength + ' ' + circumference + '" stroke-dashoffset="' + -currentOffset + '" transform="rotate(-90 ' + centerX + ' ' + centerY + ')"/>';
      currentOffset += segmentLength;
    });
    svg += '</svg>';
    return svg;
  },
  generateGanttHTML: function (ganttData, options) {
    options = options || {};
    var barHeight = options.barHeight || 36;
    var monthWidth = options.monthWidth || 40;
    if (!ganttData || !ganttData.phases) return '';
    var html = '<div class="gantt-chart" style="overflow-x:auto;">';
    html += '<div style="display:flex;border-bottom:1px solid #e5e7eb;margin-bottom:8px;">';
    for (var m = 0; m < ganttData.totalDuration; m++) {
      html += '<div style="width:' + monthWidth + 'px;text-align:center;font-size:11px;color:#6b7280;padding:4px 0;">M' + (m + 1) + '</div>';
    }
    html += '</div>';
    ganttData.phases.forEach(function (phase) {
      html += '<div style="display:flex;align-items:center;margin-bottom:8px;">';
      html += '<div style="width:120px;font-size:12px;font-weight:500;color:#374151;padding-right:12px;text-align:right;">' + phase.label + '</div>';
      html += '<div style="flex:1;position:relative;height:' + barHeight + 'px;background:#f3f4f6;border-radius:4px;">';
      var leftOffset = phase.start * monthWidth;
      var barWidth = phase.duration * monthWidth;
      html += '<div style="position:absolute;left:' + leftOffset + 'px;width:' + barWidth + 'px;height:100%;background:' + phase.color + ';border-radius:4px;display:flex;align-items:center;justify-content:center;">';
      html += '<span style="color:white;font-size:11px;font-weight:500;">' + phase.duration + ' ' + ganttData.unit + '</span>';
      html += '</div></div></div>';
    });
    html += '</div>';
    return html;
  }
};
console.log('✅ MOUDAR v8.1 Modules chargés: MoudarDataManager, OnboardingWizard, InteractiveCharts');

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE v8.2 - VALIDATION RIGOUREUSE DES DONNÉES
// ═══════════════════════════════════════════════════════════════════════════════

export default InteractiveCharts;
