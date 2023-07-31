import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { updateGamesData } from '../../../server/services/gamesService';
import { ScrollView } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateGamesScreen = ({ route, navigation }) => {
    const { id, item } = route.params;
    const [title, setTitle] = useState(item.title ?? '');
    const [description, setDescription] = useState(item.description ?? '');
    const [platforms, setPlatforms] = useState(item.platforms ?? '');
    const [category, setCategory] = useState(item.category ?? '');
    const [gamemodes, setGamemodes] = useState(item.gamemodes ?? '');
    const [releaseDate, setReleaseDate] = useState(item.releaseDate ?? new Date());
    const [rating, setRating] = useState(item.rating ?? 0);
    const [ageRate, setAgeRate] = useState(item.ageRate ?? 18);
    const [publishers, setPublishers] = useState(item.publishers ?? '');
    const [companies, setCompanies] = useState(item.companies ?? '');
    const [image, setImage] = useState(item.image ?? '');
    const [cover, setCover] = useState(item.cover ?? '');
    const [isFeatured, setIsFeatured] = useState(item.isFeatured ?? false);
    const [showDTPicker, setShowDTPicker] = useState(false);

    const back = () => {
        navigation.navigate("gamesDrawer");
    };

    const handleReset = () => {
        setTitle('');
        setDescription('');
        setPlatforms('');
        setCategory('');
        setGamemodes('');
        setReleaseDate(new Date());
        setRating(0);
        setAgeRate(18);
        setPublishers('');
        setCompanies('');
        setImage('');
        setCover('');
        setIsFeatured(false);
    };

    const handleSubmit = async () => {
        try {
            var mynewitem = {
                id: parseInt(id, 0),
                title: title,
                description: description,
                platforms: platforms,
                category: category,
                gamemodes: gamemodes,
                releaseDate: releaseDate,
                rating: parseInt(rating, 0),
                ageRate: parseInt(ageRate, 0),
                publishers: publishers,
                companies: companies,
                image: image,
                cover: cover,
                isFeatured: isFeatured
            };

            await updateGamesData(id, mynewitem);
            navigation.navigate("gamesDetailsDrawer", { item: mynewitem });
        } catch {
            console.log('Error updating game: ', error);
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDTPicker(false);
        setReleaseDate(new Date(currentDate).toISOString());
    };

    const showMyDTPCalender = () => {
        setShowDTPicker(true);
    };

    return (
        <SafeAreaView style={styles.mcontainer}>
            <ScrollView style={styles.container}>
                {
                    !id && (
                        <>
                            <Text style={styles.title}>Game hasnt been found to be updated!</Text>
                            <Button title="Back" style={styles.btn} onPress={back} />
                        </>
                    )
                }

                {
                    !!id && (
                        <>
                            <View style={styles.inputGrp}>
                                <Text>Title</Text>
                                <TextInput 
                                    inputMode='text'
                                    placeholder='Write the title here' 
                                    value={title} 
                                    onChangeText={setTitle} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Description</Text>
                                <TextInput 
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    inputMode='text'
                                    placeholder='Write the description here' 
                                    value={description} 
                                    onChangeText={setDescription} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Platforms</Text>
                                <TextInput 
                                    inputMode='text'
                                    placeholder='Write the platforms here' 
                                    value={platforms} 
                                    onChangeText={setPlatforms} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Category</Text>
                                <TextInput 
                                    inputMode='text'
                                    placeholder='Write the category here' 
                                    value={category} 
                                    onChangeText={setCategory} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Game Modes</Text>
                                <TextInput 
                                    inputMode='text'
                                    placeholder='Write the game modes (singleplayer, multiplayer, etc...) here' 
                                    value={gamemodes} 
                                    onChangeText={setGamemodes} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Release Date</Text>
                                <Button 
                                    title="Show date picker" 
                                    style={styles.btnDT} 
                                    onPress={showMyDTPCalender} 
                                />
                                <TextInput
                                    inputMode='text'
                                    placeholder='Write the release date here' 
                                    value={releaseDate} 
                                    style={styles.datetime} 
                                    editable={false}
                                />
                                {showDTPicker && (
                                    <DateTimePicker
                                        testID="myDateTimePicker"
                                        value={new Date(releaseDate)}
                                        mode={'date'}
                                        is24Hour={true}
                                        onChange={onDateChange}
                                    />
                                )}
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Rating</Text>
                                <TextInput 
                                    inputMode='numeric'
                                    placeholder='Write the rating (0-10) here' 
                                    value={rating.toString()} 
                                    onChangeText={setRating} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Age Rate</Text>
                                <TextInput 
                                    inputMode='numeric'
                                    placeholder='Write the age rating here' 
                                    value={ageRate.toString()} 
                                    onChangeText={setAgeRate} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Publishers</Text>
                                <TextInput 
                                    inputMode='text'
                                    placeholder='Write the publishers name here' 
                                    value={publishers} 
                                    onChangeText={setPublishers} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Companies</Text>
                                <TextInput 
                                    inputMode='text'
                                    placeholder='Write the companies name here' 
                                    value={companies} 
                                    onChangeText={setCompanies} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Image</Text>
                                <TextInput 
                                    inputMode='url'
                                    placeholder='Write the image url here' 
                                    value={image} 
                                    onChangeText={setImage} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Cover</Text>
                                <TextInput 
                                    inputMode='url'
                                    placeholder='Write the cover url here' 
                                    value={cover} 
                                    onChangeText={setCover} 
                                    style={styles.input} 
                                />
                            </View>
                            <View style={styles.inputGrp}>
                                <Text>Is Featured?</Text>
                                <Checkbox 
                                    placeholder='Set status of featured here' 
                                    value={isFeatured} 
                                    onValueChange={setIsFeatured} 
                                    style={styles.checkbox} 
                                    color={isFeatured ? '#bcdf16' : '#808080'}
                                />
                            </View>
                            <View style={styles.btnGrp}>
                                <Button title="Reset" style={[styles.btn, styles.btnReset]} onPress={handleReset} />
                                <Button title="Update" style={[styles.btn, styles.btnSubmit]} onPress={handleSubmit} />
                            </View>
                            <View style={styles.btnGrp}>
                                <Button title="Back" style={styles.btn} onPress={back} />
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
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputGrp: {
        flexDirection: 'column',
        margin: 15
    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        width: '100%',
        padding: 15,
        marginTop: 15,
        borderRadius: 15
    },
    datetime: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        marginTop: 15,
        padding: 15,
        borderRadius: 15
    },
    checkbox: {
        margin: 15
    },
    btnGrp: {
        flexDirection: 'row',
        margin: 15
    },
    btn: {
        textAlign: 'center',
        padding: 15,
        margin: 15
    },
    btnReset: {
        backgroundColor: '#808080',
        color: 'white'
    },
    btnSubmit: {
        backgroundColor: '#3F51B5',
        color: 'white'
    }
});

export default UpdateGamesScreen;