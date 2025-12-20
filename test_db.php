<?php
// Test database connection script
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Database Connection Test</h1>";

// Test configurations
$configs = [
    ['host' => '127.0.0.1', 'port' => '3307', 'name' => 'IP with port 3307'],
    ['host' => 'localhost', 'port' => '3307', 'name' => 'localhost with port 3307'],
    ['host' => '127.0.0.1', 'port' => '3306', 'name' => 'IP with port 3306'],
    ['host' => 'localhost', 'port' => '3306', 'name' => 'localhost with port 3306'],
];

foreach ($configs as $config) {
    $dsn = "mysql:host={$config['host']};port={$config['port']}";
    echo "<h3>Testing: {$config['name']}</h3>";
    echo "<p>DSN: $dsn</p>";

    try {
        $pdo = new PDO($dsn, 'root', '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5
        ]);
        echo "<p style='color: green;'>✓ SUCCESS - Connected!</p>";

        // Try to get server info
        $version = $pdo->query('SELECT VERSION()')->fetchColumn();
        echo "<p>MySQL Version: $version</p>";

        // Check if database exists
        $stmt = $pdo->query("SHOW DATABASES LIKE 'fitzone_database'");
        echo "<p>Database fitzone_database exists: " . ($stmt->fetch() ? 'Yes' : 'No') . "</p>";

    } catch (PDOException $e) {
        echo "<p style='color: red;'>✗ FAILED - " . $e->getMessage() . "</p>";
    }
    echo "<hr>";
}
?>