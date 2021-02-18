-- Strict SQL mode disabled:
SET sql_mode = '';

INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('0','Unknown','None',TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('10','Currently Available (Automated Status)',TRUE,FALSE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('20','Currently In Use (Automated Status)',TRUE,FALSE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('30','Temporarily Unavailable',TRUE,TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('50','Operational',TRUE,TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('75','Partly Operational (Mixed)',TRUE,TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('100','Not Operational',FALSE,TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('150','Planned For Future Date',FALSE,TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('200','Removed (Decommissioned)',FALSE,TRUE);
INSERT INTO BorneToGo.Status (idStatus, Titre, IsOperational, IsUserSelectable) VALUES ('210','Removed (Duplicate Listing)',FALSE,TRUE);
