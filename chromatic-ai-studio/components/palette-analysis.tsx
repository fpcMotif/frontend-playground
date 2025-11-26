import type React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ColorData } from "@/types";

type PaletteAnalysisProps = {
  colors: ColorData[];
};

type ChartDataItem = {
  name: string;
  lightness: string;
  chroma: string;
  hex: string;
};

type TooltipPayloadItem = {
  value: string;
  payload: ChartDataItem;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-(--color-border) bg-(--color-bg-elevated) p-3 text-xs shadow-2xl backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ background: payload[0].payload.hex }}
          />
          <p className="font-bold font-mono text-(--color-text-primary)">
            {payload[0].payload.hex}
          </p>
        </div>
        <p className="text-(--color-text-secondary)">
          Lightness (OKLCH):{" "}
          <span className="font-mono text-(--color-text-primary)">
            {payload[0].value}%
          </span>
        </p>
        <p className="text-(--color-text-secondary)">
          Chroma:{" "}
          <span className="font-mono text-(--color-text-primary)">
            {payload[0].payload.chroma}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export const PaletteAnalysis: React.FC<PaletteAnalysisProps> = ({ colors }) => {
  const data: ChartDataItem[] = colors.map((c) => ({
    name: c.hex,
    lightness: Number(c.oklch.l * 100).toFixed(1), // OKLCH Lightness 0-100
    chroma: Number(c.oklch.c * 100).toFixed(2),
    hex: c.hex,
  }));

  return (
    <div className="h-full w-full rounded-2xl border border-(--color-border-subtle) bg-(--color-bg-elevated) p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-(--color-text-muted) text-xs uppercase tracking-wider">
          Perceptual Lightness Analysis
          <span className="rounded bg-(--color-accent-soft) px-2 py-0.5 text-(--color-accent) text-[10px]">
            OKLCH
          </span>
        </h3>
      </div>

      <ResponsiveContainer height="100%" width="100%">
        <BarChart barSize={40} data={data}>
          <CartesianGrid
            stroke="var(--color-border-subtle)"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="name"
            dy={10}
            tick={{ fill: "var(--color-text-muted)", fontSize: 10 }}
            tickLine={false}
          />
          <YAxis domain={[0, 100]} hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "var(--color-border-subtle)" }}
          />
          <Bar dataKey="lightness" radius={[8, 8, 8, 8]}>
            {data.map((entry) => (
              <Cell
                className="transition-all duration-300 hover:opacity-80"
                fill={entry.hex}
                key={entry.hex}
                stroke="var(--color-border-subtle)"
                strokeWidth={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
