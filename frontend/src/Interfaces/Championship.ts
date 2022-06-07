export default interface IChampionship{
    name: string;
    languages: Array<string>;
    visibility: "PUBLIC" | "PRIVATE";
    startDate: string;
    finishDate: string;
    idChampionship: number;
    ownerUsername: number;
}
