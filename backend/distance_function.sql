/* Change delimiter so that MySQL does not think the statement is over when using ; */
DELIMITER &&

/* Algorithm from: https://enlear.academy/working-with-geo-coordinates-in-mysql-5451e54cddec */
CREATE FUNCTION dist (posLat DECIMAL(35, 30), posLong DECIMAL(35, 30), userLat DECIMAL(35, 30), userLong DECIMAL(35, 30)) 
RETURNS DECIMAL(40, 30)
DETERMINISTIC
BEGIN
    DECLARE DIST_M DECIMAL(40, 30);
    SET DIST_M = 6371000 * Acos(Cos(Radians(userLat)) * Cos(Radians(posLat)) * 
                                        Cos(Radians(posLong) - Radians(userLong)) + 
                                        Sin(Radians(userLat)) * Sin(Radians(posLat)));
    RETURN DIST_M;
END&&

/* Change delimiter back to default */
DELIMITER ;