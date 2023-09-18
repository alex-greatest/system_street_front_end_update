import {Document, Image, Page, Text, View, StyleSheet, Font} from "@react-pdf/renderer";
import React from "react";
import {observer} from "mobx-react-lite";

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

// Create style with font-family
const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto"
    },
    section: {
        fontFamily: "Roboto",
        fontSize: "25px",
        margin: "30px 0"
    },
    title: {
        marginBottom: "20px",
        fontSize: "30px",
        fontFamily: "Roboto",
        textAlign: "center"
    },
    image: {
        width: "300px",
        height: "600px"
    }
});

export const GraphPdf = observer((props: {
    idHtmlGraphEffort: string,
    idHtmlGraphMoment: string,
    idHtmlTableMoment: string,
    partName: string,
    modeDescription: string,
    date: Date,
}) => {
    const {
        idHtmlGraphEffort,
        idHtmlGraphMoment,
        idHtmlTableMoment,
        partName,
        modeDescription,
        date} = props

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.title}>
                    <Text>Код механизма: {partName}</Text>
                </View>
                <View style={styles.title}>
                    <Text>Тип механизма: {modeDescription}</Text>
                </View>
                <View style={styles.title}>
                    <Text>Дата: {date.toString()}</Text>
                </View>
                <View style={styles.section}>
                    <Text>График усилия</Text>
                </View>
                {idHtmlGraphEffort &&
                    <View>
                        <Image src={idHtmlGraphEffort}/>
                    </View>
                }
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Данные параметров распределителя ГУР</Text>
                </View>
                {idHtmlGraphMoment &&
                    <View>
                        <Image src={idHtmlTableMoment}/>
                    </View>
                }
                {idHtmlTableMoment &&
                    <View>
                        <Image src={idHtmlGraphMoment}/>
                    </View>
                }
            </Page>
        </Document>);
});