# Changes...

... from ``` ../BDD/BDDScript/BDDScript3.sql ```:

## Disabling SQL strict mode (for mysql 8.0):
```
-- Strict SQL mode disabled:
SET sql_mode = '';
```

## Fixing coordinates sign and decimal places:

```
From:
`Latitude` DECIMAL(8 , 6 ) UNSIGNED ZEROFILL,
`Longitude` DECIMAL(9 , 6 ) UNSIGNED ZEROFILL,

To:
`Latitude` DECIMAL(9, 6),
`Longitude` DECIMAL(9, 6),
```

## Fixing some type errors:

```
'True' -> TRUE
'False' -> FALSE
```

## Creating a new table StationBorne:

The Borne table had 27522 entries, however 99% of it were duplicates, after cleaning only 295 entries remained. This change implied creating a new table, and modifying the Borne and Station tables.
