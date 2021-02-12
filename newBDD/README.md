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
