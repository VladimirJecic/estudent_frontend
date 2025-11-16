import { forwardRef, memo } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import Button from "@/components/custom/Button";
import { ChartSeries, CourseReportPresentation } from "@/types/report";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartColors = [
  "rgba(78, 102, 196, 0.65)",
  "rgba(33, 150, 83, 0.65)",
  "rgba(246, 173, 85, 0.7)",
];

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grace: "5%" },
  },
};

type CourseReportPreviewProps = {
  report: CourseReportPresentation;
  onDownload: () => void;
  onClose: () => void;
};

const CourseReportPreview = forwardRef<
  HTMLDivElement,
  CourseReportPreviewProps
>(function CourseReportPreview({ report, onDownload, onClose }, ref) {
  const chartSeries: Array<{ series: ChartSeries; color: string }> = [
    { series: report.attendance, color: chartColors[0] },
    { series: report.passage, color: chartColors[1] },
    { series: report.averageScore, color: chartColors[2] },
  ];

  return (
    <div ref={ref} className="course-report-preview w-100">
      <div className="course-report-summary">
        <div className="course-report-summary-card">
          <h5>Upisani studenti</h5>
          <p className="course-report-summary-value">{report.enrolledCount}</p>
        </div>
        <div className="course-report-summary-card">
          <h5>Položili</h5>
          <p className="course-report-summary-value">
            {`${report.passedCount}/${report.enrolledCount} (${report.passedPercentage}%)`}
          </p>
        </div>
      </div>

      <div className="course-report-charts">
        {chartSeries.map(({ series, color }, index) => (
          <div className="course-report-chart" key={`${series.label}-${index}`}>
            <h6>{series.label}</h6>
            <div className="course-report-chart-body">
              <Bar
                data={buildChartData(series, color)}
                options={chartOptions}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 justify-content-end course-report-actions">
        <div className="col-3 d-flex">
          <Button
            className="bg-secondary-darken-1 w-100 d-flex justify-content-center"
            icon="fa-solid fa-xmark"
            iconSize="1rem"
            onClick={onClose}
          >
            Zatvori
          </Button>
        </div>
        <div className="col-3 d-flex">
          <Button
            className="bg-primary w-100 d-flex justify-content-center"
            icon="fa-solid fa-file-pdf"
            iconSize="1rem"
            onClick={onDownload}
          >
            Preuzmi PDF
          </Button>
        </div>
      </div>
    </div>
  );
});

function buildChartData(series: ChartSeries, color: string): ChartData<"bar"> {
  return {
    labels: series.categories,
    datasets: [
      {
        label: series.label,
        data: series.data,
        backgroundColor: color,
        borderRadius: 8,
        maxBarThickness: 48,
      },
    ],
  };
}

export default memo(CourseReportPreview);
