import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { insertGamesData } from '../../../server/services/gamesService';
import { ScrollView } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateGamesScreen = ({route, navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [platforms, setPlatforms] = useState('');
    const [category, setCategory] = useState('');
    const [gamemodes, setGamemodes] = useState('');
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [rating, setRating] = useState(0);
    const [ageRate, setAgeRate] = useState(18);
    const [publishers, setPublishers] = useState('');
    const [companies, setCompanies] = useState('');
    const [image, setImage] = useState('');
    const [cover, setCover] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [objdata, setObjData] = useState({});
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
            setObjData({
                title: title, 
                description: description, 
                platforms: platforms,
                category: category,
                gamemodes: gamemodes,
                releaseDate: releaseDate,
                rating: rating,
                ageRate: ageRate,
                publishers: publishers,
                companies: companies,
                image: image,
                cover: cover,
                isFeatured: isFeatured
            });

            await insertGamesData(objdata);
            navigation.navigate("gamesDrawer");
        } catch {
            console.log('Error creating game: ', error);
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDTPicker(false);
        setReleaseDate(currentDate);
    };

    const showMyDTPCalender = () => {
        setShowDTPicker(true);
    };

    return (
        <SafeAreaView style={styles.mcontainer}>
            <ScrollView style={styles.container}>
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
                        value={releaseDate.toISOString()} 
                        style={styles.datetime} 
                        editable={false}
                    />
                    {showDTPicker && (
                        <DateTimePicker
                            testID="myDateTimePicker"
                            value={releaseDate}
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
                    <Button title="Create" style={[styles.btn, styles.btnSubmit]} onPress={handleSubmit} />
                </View>
                <View style={styles.btnGrp}>
                    <Button title="Back" style={styles.btn} onPress={back} />
                </View>
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
        backgroundColor: 'white',
        color: 'black',
        width: '100%',
        padding: 15,
        marginTop: 15,
        borderRadius: 15
    },
    checkbox: {
        margin: 15
    },
    btnGrp: {
        flexDirection: 'row',
        margin: 15,
        padding: 15,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        padding: 15,
        margin: 15
    },
    btnDT: {
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

export default CreateGamesScreen;