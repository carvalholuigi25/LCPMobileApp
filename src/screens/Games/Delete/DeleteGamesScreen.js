import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { deleteGamesData } from '../../../server/services/gamesService';
import { ScrollView } from 'react-native-gesture-handler';

const DeleteGamesScreen = ({route, navigation}) => {
    const { id } = route.params;

    const back = () => {
        navigation.navigate("gamesDrawer");
    };

    const handleNo = () => {
        back();
    };

    const handleYes = async () => {
        try {
            await deleteGamesData(id);
            navigation.navigate("gamesDrawer");
        } catch {
            console.log('Error updating game: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.mcontainer}>
            <ScrollView style={styles.container}>
                {
                    !id && (
                        <>
                            <Text style={styles.title}>Game hasnt been found to be deleted!</Text>
                            <Button title="Back" style={styles.btn} onPress={back} />
                        </>
                    )
                }

                {
                    !!id && (
                        <>
                            <Text style={styles.title}>Do you want to delete this game (id: {id})?</Text>
                            <View style={styles.btnGrp}>
                                <Button title="No" style={[styles.btn, styles.btnYes]} onPress={handleNo} />
                                <Button title="Yes" style={[styles.btn, styles.btnNo]} onPress={handleYes} />
                            </View>
                        </>
                    )
                }
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    mcontainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 15
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnGrp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        flex: 1,
        margin: 15
    },
    btn: {
        textAlign: 'center',
        padding: 15,
        margin: 15
    },
    btnNo: {
        backgroundColor: '#808080',
        color: 'white',
    },
    btnYes: {
        backgroundColor: '#3F51B5',
        color: 'white'
    }
});

export default DeleteGamesScreen;