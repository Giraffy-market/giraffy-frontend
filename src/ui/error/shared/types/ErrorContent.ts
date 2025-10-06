export interface ErrorContent {
  [key: string]: {
    titleLines: string[];
    description: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    showUpdateButton: boolean;
  };
}
