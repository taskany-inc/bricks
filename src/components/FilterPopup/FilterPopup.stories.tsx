import React, { useRef, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { FiltersMenuItem } from '../FiltersContainers';
import { FilterTabLabel } from '../FilterTabLabel';
import { FilterBase } from '../FilterBase';
import { FilterCheckbox } from '../FilterCheckbox';
import { FilterAutoCompleteInput } from '../FilterAutoCompleteInput';
import { Tab } from '../Tabs/Tabs';

import { FilterPopup } from './FilterPopup';

const meta: Meta<typeof FilterPopup> = {
    title: 'FilterPopup',
    component: FilterPopup,
};

export default meta;

type Story = StoryFn<typeof meta>;

const genreList = [
    'Comedy',
    'Fantasy',
    'Crime',
    'Drama',
    'Music',
    'Adventure',
    'History',
    'Thriller',
    'Animation',
    'Family',
    'Mystery',
    'Biography',
    'Action',
    'Film-Noir',
    'Romance',
    'Sci-Fi',
    'War',
    'Western',
    'Horror',
    'Musical',
    'Sport',
];
const directorList = [
    'Tim Burton',
    'Francis Ford Coppola',
    'Frank Darabont',
    'Peter Faiman',
    'Bryan Singer',
    'Christopher Nolan',
    'Matthew Vaughn',
    'Mel Gibson',
    'Martin Scorsese',
    'Rian Johnson',
    'Carol Reed',
    'Danny Boyle',
    'Brian De Palma',
    'Alex Cox',
    'Darren Aronofsky',
    'Michael Cimino',
    'Kevin Smith',
    'Quentin Tarantino',
    'Jonathan Demme',
    'Sam Mendes',
    'Guy Ritchie',
    'Alan Parker',
    'Paul McGuigan',
    'Alfred Hitchcock',
    'Guillermo del Toro',
    'Stanley Kubrick',
    'Woody Allen',
    'Tom Hooper',
    'Curtis Hanson',
    'Bennett Miller',
    'Todd Phillips',
    'Paolo Sorrentino',
    'Clint Eastwood',
    'Adam Elliot',
    'Robert Zemeckis',
    'Milos Forman',
    'Peter Weir',
    'Michel Hazanavicius',
    'Peter Jackson',
    'Sofia Coppola',
    'Oliver Hirschbiegel',
    'Bobcat Goldthwait',
    'David Fincher',
    'Roman Polanski',
    'Frank Marshall',
    'Michael Curtiz',
    'Ridley Scott',
    'Steven Spielberg',
    'Tony Kaye',
    'Gore Verbinski',
    'Rob Marshall',
    'Paul Haggis',
    'Chan-wook Park',
    'Lasse Hallström',
    'Martin Campbell',
    'Andrew Stanton',
    'Billy Wilder',
    'Eric Steven Stahl',
    'Wes Anderson',
    'Garth Jennings',
    'Sergio Leone',
    'Joseph Kosinski',
    'James McTeigue',
    'Andrew Niccol',
    'David O. Russell',
    'Richard Attenborough',
    'Shane Black',
    'Phillip Noyce',
    'J.A. Bayona',
    'Lewis Milestone',
    'Anthony Minghella',
    'Jean-Marc Vallée',
    'Julie Taymor',
    'Richard Linklater',
    'Bruce Robinson',
    'Edward Zwick',
    'John Michael McDonagh',
    'Hayao Miyazaki',
    'Régis Wargnier',
    'Alejandro G. Iñárritu',
    'Sidney Lumet',
    'Morten Tyldum',
    'Jean-Baptiste Andrea',
    'Wolfgang Petersen',
    'Alexander Payne',
    'Doug Liman',
    'Michael Cristofer',
    'Mike Mitchell',
    'Baz Luhrmann',
    'Alex Garland',
    'James Marsh',
    'N/A',
    'Tom McCarthy',
    'Damien Chazelle',
    'Florian Henckel von Donnersmarck',
    'Terry George',
    'Robert Mulligan',
    'Asghar Farhadi',
    'Adam McKay',
];
const formats = ['Film', 'Short film', 'Series'];

const keyGetter = (arg: string) => arg;

export const Default: Story = () => {
    const filterNodeRef = useRef<HTMLSpanElement>(null);
    const [filterVisible, setFilterVisible] = useState(false);

    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
    const [selectedDirectors, setSelectedDirectors] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const [directorQuery, setDirectorQuery] = useState('');
    const [genreQuery, setGenreQuery] = useState('');

    const directors = directorList
        .filter(
            (director) =>
                !selectedDirectors.some((selectedDirector) => selectedDirector === director) &&
                director.toLowerCase().includes(directorQuery.toLowerCase()),
        )
        .splice(0, 5)
        .concat(...selectedDirectors);
    const genres = genreList
        .filter(
            (genre) =>
                !selectedGenres.some((selectedGenre) => selectedGenre === genre) &&
                genre.toLowerCase().includes(genreQuery.toLowerCase()),
        )
        .splice(0, 5)
        .concat(...selectedGenres);

    const isFiltersEmpty = !directors.length && !formats.length && !genres.length;

    const onApplyClick = () => {
        setFilterVisible(false);
        console.log({ selectedDirectors, selectedGenres, selectedFormats });
    };

    return (
        <>
            <FiltersMenuItem ref={filterNodeRef} active={!isFiltersEmpty} onClick={() => setFilterVisible((p) => !p)}>
                Filter
            </FiltersMenuItem>
            <FilterPopup
                applyButtonText="Apply"
                cancelButtonText="Cancel"
                visible={filterVisible}
                onApplyClick={onApplyClick}
                filterRef={filterNodeRef}
                switchVisible={setFilterVisible}
                activeTab="state"
            >
                <Tab name="format" label={<FilterTabLabel text="Format" selected={selectedFormats} />}>
                    <FilterBase
                        key="format"
                        mode="multiple"
                        viewMode="union"
                        items={formats}
                        value={selectedFormats}
                        keyGetter={keyGetter}
                        onChange={setSelectedFormats}
                        renderItem={({ item, checked, onItemClick }) => (
                            <FilterCheckbox
                                name="format"
                                value={item}
                                checked={checked}
                                onClick={onItemClick}
                                label={item}
                            />
                        )}
                    />
                </Tab>
                <Tab name="director" label={<FilterTabLabel text="Director" selected={selectedDirectors} />}>
                    <FilterBase
                        title="Suggestions"
                        key="director"
                        mode="multiple"
                        viewMode="split"
                        items={directors}
                        keyGetter={keyGetter}
                        value={selectedDirectors}
                        onChange={setSelectedDirectors}
                        renderItem={({ item, checked, onItemClick }) => {
                            return (
                                <FilterCheckbox
                                    name="director"
                                    value={item}
                                    checked={checked}
                                    onClick={onItemClick}
                                    label={item}
                                />
                            );
                        }}
                    >
                        <FilterAutoCompleteInput placeholder="Search" onChange={setDirectorQuery} />
                    </FilterBase>
                </Tab>
                <Tab name="genre" label={<FilterTabLabel text="Genre" selected={selectedGenres} />}>
                    <FilterBase
                        title="Suggestions"
                        key="genre"
                        mode="multiple"
                        viewMode="split"
                        items={genres}
                        keyGetter={keyGetter}
                        value={selectedGenres}
                        onChange={setSelectedGenres}
                        renderItem={({ item, checked, onItemClick }) => {
                            return (
                                <FilterCheckbox
                                    name="genre"
                                    value={item}
                                    checked={checked}
                                    onClick={onItemClick}
                                    label={item}
                                />
                            );
                        }}
                    >
                        <FilterAutoCompleteInput placeholder="Search" onChange={setGenreQuery} />
                    </FilterBase>
                </Tab>
            </FilterPopup>
        </>
    );
};
