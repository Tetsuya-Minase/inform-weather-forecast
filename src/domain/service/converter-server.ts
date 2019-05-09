export interface ConverterServer{
    domDataFormatter(domList);
    list2FullInformation(indexList: Array<Array<string>>, pictDataList: Array<Array<string>>, temperatureDataList: Array<Array<string>>);
    list2TodayDetailInformation(list: Array<Array<string>>, pictDataList: Array<Array<string>>, temperatureDataList: Array<Array<string>>);
}