import { CategoryDTO } from "./CategoryDTO.model";

export interface PieChartDataDTO {
    amount?: number;
    category?: CategoryDTO;
    categoryId?: string;
}