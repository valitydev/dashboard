export interface Series {
    name?: string;
    data: {
        x: unknown;
        y: unknown;
        fillColor?: string;
        strokeColor?: string;
    }[];
}

export interface ChartData {
    currency: string;
    series: Series[];
}
